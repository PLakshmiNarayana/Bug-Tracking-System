package com.bugtracker.bugtracker_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.bugtracker_backend.enums.BugPriority;
import com.bugtracker.bugtracker_backend.enums.BugStatus;
import com.bugtracker.bugtracker_backend.model.Bug;
import com.bugtracker.bugtracker_backend.model.User;
import com.bugtracker.bugtracker_backend.repository.BugRepository;
import com.bugtracker.bugtracker_backend.repository.UserRepository;

@Service
public class BugService {

    @Autowired
    private BugRepository bugRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BugHistoryService bugHistoryService;

    @Autowired
    private ActivityLogService activityLogService;

    @Autowired
    private EmailService emailService;

    // Get all bugs
    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

    // Get bug by ID
    public Bug getBugById(Long id) {
        return bugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bug not found with id: " + id));
    }

    // Create bug
    public Bug createBug(Bug bug) {

        bug.setStatus(BugStatus.OPEN);


        Bug savedBug = bugRepository.save(bug);

        bugHistoryService.recordHistory(
                "Bug created: " + savedBug.getTitle(),
                "SYSTEM",
                savedBug
        );

        activityLogService.logAction(
                "Bug created: " + savedBug.getTitle(),
                "SYSTEM"
        );

        // Send email notification to admin
        emailService.sendEmail(
                "Pottabobby23@gmail.com",
                "New Bug Created",
                "A new bug has been reported.\n\nTitle: " + savedBug.getTitle() +
                        "\nPriority: " + savedBug.getPriority() +
                        "\nStatus: " + savedBug.getStatus()
        );

        return savedBug;
    }

    // Update bug
    public Bug updateBug(Long id, Bug bugDetails) {

        Bug bug = getBugById(id);

        bug.setTitle(bugDetails.getTitle());
        bug.setDescription(bugDetails.getDescription());
        bug.setPriority(bugDetails.getPriority());
        bug.setStatus(bugDetails.getStatus());
        bug.setAssignedTo(bugDetails.getAssignedTo());
        

        Bug updatedBug = bugRepository.save(bug);

        bugHistoryService.recordHistory(
                "Bug updated",
                "SYSTEM",
                updatedBug
        );

        activityLogService.logAction(
                "Bug updated: " + updatedBug.getTitle(),
                "SYSTEM"
        );

        return updatedBug;
    }

    // Delete bug
    public void deleteBug(Long id) {

        Bug bug = getBugById(id);

        bugHistoryService.recordHistory(
                "Bug deleted",
                "SYSTEM",
                bug
        );

        activityLogService.logAction(
                "Bug deleted: " + bug.getTitle(),
                "SYSTEM"
        );

        bugRepository.deleteById(id);
    }

    // Update bug status
    public Bug updateBugStatus(Long id, BugStatus status) {

        Bug bug = getBugById(id);

        BugStatus oldStatus = bug.getStatus();

        bug.setStatus(status);

        Bug updatedBug = bugRepository.save(bug);

        bugHistoryService.recordHistory(
                "Status changed from " + oldStatus + " to " + status,
                "SYSTEM",
                updatedBug
        );

        activityLogService.logAction(
                "Bug status changed from " + oldStatus + " to " + status,
                "SYSTEM"
        );

        // Email tester when status changes
        if (bug.getCreatedBy() != null) {

            emailService.sendEmail(
                    bug.getCreatedBy().getEmail(),
                    "Bug Status Updated",
                    "Bug '" + bug.getTitle() + "' status changed from " + oldStatus + " to " + status
            );
        }

        return updatedBug;
    }

    // Assign bug to developer
    public Bug assignBug(Long bugId, Long developerId) {

        Bug bug = getBugById(bugId);

        User developer = userRepository.findById(developerId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + developerId));

        // Ensure user is developer
        if (!developer.getRole().name().equals("DEVELOPER")) {
            throw new RuntimeException("Selected user is not a developer");
        }

        bug.setAssignedTo(developer);
        bug.setStatus(BugStatus.ASSIGNED);

        Bug updatedBug = bugRepository.save(bug);

        bugHistoryService.recordHistory(
                "Bug assigned to developer: " + developer.getName(),
                "SYSTEM",
                updatedBug
        );

        activityLogService.logAction(
                "Bug assigned to developer: " + developer.getName(),
                "SYSTEM"
        );

        // Send email to developer
        emailService.sendEmail(
                developer.getEmail(),
                "Bug Assigned To You",
                "Hello " + developer.getName() +
                        "\n\nYou have been assigned a new bug.\n\nTitle: " + bug.getTitle() +
                        "\nPriority: " + bug.getPriority()
        );

        return updatedBug;
    }

    // Get bugs by status
    public List<Bug> getBugsByStatus(BugStatus status) {
        return bugRepository.findByStatus(status);
    }

    // Get bugs by priority
    public List<Bug> getBugsByPriority(BugPriority priority) {
        return bugRepository.findByPriority(priority);
    }

    // Get bugs assigned to developer
    public List<Bug> getBugsByAssignedUser(User user) {
        return bugRepository.findByAssignedTo(user);
    }

    public Bug saveBug(Bug bug) {
        return bugRepository.save(bug);
    }

    // Search bugs
    public List<Bug> searchBugs(String keyword) {
        return bugRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
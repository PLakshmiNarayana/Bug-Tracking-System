package com.bugtracker.bugtracker_backend.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.bugtracker.bugtracker_backend.enums.BugPriority;
import com.bugtracker.bugtracker_backend.enums.BugStatus;
import com.bugtracker.bugtracker_backend.model.Bug;
import com.bugtracker.bugtracker_backend.model.User;
import com.bugtracker.bugtracker_backend.service.BugService;

@RestController
@RequestMapping("/api/bugs")
@CrossOrigin
public class BugController {

    @Autowired
    private BugService bugService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER','TESTER')")
    public List<Bug> getAllBugs() {
        return bugService.getAllBugs();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER','TESTER')")
    public Bug getBugById(@PathVariable Long id) {
        return bugService.getBugById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TESTER')")
    public Bug createBug(@RequestBody Bug bug) {
        return bugService.createBug(bug);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')")
    public Bug updateBug(@PathVariable Long id, @RequestBody Bug bug) {
        return bugService.updateBug(id, bug);
    }

    @PutMapping("/{bugId}/assign/{developerId}")
    @PreAuthorize("hasAnyRole('ADMIN','TESTER')")
    public Bug assignBug(@PathVariable Long bugId, @PathVariable Long developerId) {
        System.out.println("Assigning bug " + bugId + " to developer " + developerId);
        return bugService.assignBug(bugId, developerId);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBug(@PathVariable Long id) {
        bugService.deleteBug(id);
    }

    // ✅ TESTER added — can now update status
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER','TESTER')")
    public Bug updateBugStatus(@PathVariable Long id,
                               @RequestParam BugStatus status) {
        return bugService.updateBugStatus(id, status);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER','TESTER')")
    public List<Bug> getBugsByStatus(@PathVariable BugStatus status) {
        return bugService.getBugsByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER','TESTER')")
    public List<Bug> getBugsByPriority(@PathVariable BugPriority priority) {
        return bugService.getBugsByPriority(priority);
    }

    @GetMapping("/assigned/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')")
    public List<Bug> getBugsByAssignedUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return bugService.getBugsByAssignedUser(user);
    }

    @GetMapping("/developer/{developerId}")
    @PreAuthorize("hasRole('DEVELOPER')")
    public List<Bug> getDeveloperBugs(@PathVariable Long developerId) {
        User user = new User();
        user.setId(developerId);
        return bugService.getBugsByAssignedUser(user);
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER','TESTER')")
    public List<Bug> searchBugs(@RequestParam String keyword) {
        return bugService.searchBugs(keyword);
    }

    @PostMapping("/{id}/upload")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER','TESTER')")
    public Bug uploadScreenshot(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {

        String uploadDir = System.getProperty("user.dir")
                + File.separator + "uploads"
                + File.separator + "screenshots"
                + File.separator;

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File dest = new File(uploadDir + fileName);
        file.transferTo(dest);

        Bug bug = bugService.getBugById(id);
        bug.setScreenshot(fileName);
        return bugService.saveBug(bug);
    }
}
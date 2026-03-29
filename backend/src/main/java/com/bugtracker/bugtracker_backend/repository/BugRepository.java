package com.bugtracker.bugtracker_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.bugtracker_backend.enums.BugPriority;
import com.bugtracker.bugtracker_backend.enums.BugStatus;
import com.bugtracker.bugtracker_backend.model.Bug;
import com.bugtracker.bugtracker_backend.model.User;

public interface BugRepository extends JpaRepository<Bug, Long> {

    long countByStatus(BugStatus status);

    long countByPriority(BugPriority priority);

    List<Bug> findByStatus(BugStatus status);

    List<Bug> findByPriority(BugPriority priority);

    List<Bug> findByAssignedTo(User user);
    
    List<Bug> findByTitleContainingIgnoreCase(String keyword);
    
    List<Bug> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}
package com.bugtracker.bugtracker_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.bugtracker_backend.model.BugHistory;

public interface BugHistoryRepository extends JpaRepository<BugHistory, Long> {

    List<BugHistory> findByBugId(Long bugId);

}
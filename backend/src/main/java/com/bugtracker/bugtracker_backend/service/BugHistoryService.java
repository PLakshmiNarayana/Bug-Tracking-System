package com.bugtracker.bugtracker_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.bugtracker_backend.model.Bug;
import com.bugtracker.bugtracker_backend.model.BugHistory;
import com.bugtracker.bugtracker_backend.repository.BugHistoryRepository;

@Service
public class BugHistoryService {

    @Autowired
    private BugHistoryRepository bugHistoryRepository;

    public void recordHistory(String action, String user, Bug bug) {

        BugHistory history = new BugHistory(action, user, bug);

        bugHistoryRepository.save(history);
    }

    public List<BugHistory> getBugHistory(Long bugId) {

        return bugHistoryRepository.findByBugId(bugId);
    }
}
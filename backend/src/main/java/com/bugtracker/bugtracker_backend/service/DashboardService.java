package com.bugtracker.bugtracker_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.bugtracker_backend.dto.DashboardStats;
import com.bugtracker.bugtracker_backend.enums.BugPriority;
import com.bugtracker.bugtracker_backend.enums.BugStatus;
import com.bugtracker.bugtracker_backend.repository.BugRepository;

@Service
public class DashboardService {

    @Autowired
    private BugRepository bugRepository;

    public DashboardStats getDashboardStats() {

        long totalBugs = bugRepository.count();

        long openBugs = bugRepository.countByStatus(BugStatus.OPEN);

        long resolvedBugs = bugRepository.countByStatus(BugStatus.RESOLVED);

        long criticalBugs = bugRepository.countByPriority(BugPriority.CRITICAL);

        return new DashboardStats(totalBugs, openBugs, resolvedBugs, criticalBugs);
    }
}
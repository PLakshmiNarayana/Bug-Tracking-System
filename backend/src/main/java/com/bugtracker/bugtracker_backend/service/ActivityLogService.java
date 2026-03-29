package com.bugtracker.bugtracker_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.bugtracker_backend.model.ActivityLog;
import com.bugtracker.bugtracker_backend.repository.ActivityLogRepository;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    // Save activity log
    public void logAction(String action, String user) {
        ActivityLog log = new ActivityLog(action, user);
        activityLogRepository.save(log);
    }

    // Get all activity logs
    public List<ActivityLog> getAllActivities() {
        return activityLogRepository.findAll();
    }
}
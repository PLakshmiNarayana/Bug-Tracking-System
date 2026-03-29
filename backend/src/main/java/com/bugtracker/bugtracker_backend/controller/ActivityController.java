package com.bugtracker.bugtracker_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bugtracker.bugtracker_backend.model.ActivityLog;
import com.bugtracker.bugtracker_backend.service.ActivityLogService;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    @Autowired
    private ActivityLogService activityLogService;

    @GetMapping
    public List<ActivityLog> getAllActivities() {
        return activityLogService.getAllActivities();
    }
}
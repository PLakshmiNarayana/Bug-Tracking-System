package com.bugtracker.bugtracker_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.bugtracker.bugtracker_backend.dto.DashboardStats;
import com.bugtracker.bugtracker_backend.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Dashboard statistics
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TESTER','DEVELOPER')")
    public DashboardStats getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
}
package com.bugtracker.bugtracker_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bugtracker.bugtracker_backend.model.BugHistory;
import com.bugtracker.bugtracker_backend.service.BugHistoryService;

@RestController
@RequestMapping("/api/history")
@CrossOrigin
public class BugHistoryController {

    @Autowired
    private BugHistoryService bugHistoryService;

    @GetMapping("/{bugId}")
    public List<BugHistory> getBugHistory(@PathVariable Long bugId) {

        return bugHistoryService.getBugHistory(bugId);
    }
}
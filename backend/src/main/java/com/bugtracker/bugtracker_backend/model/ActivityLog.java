package com.bugtracker.bugtracker_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;

    private String performedBy;

    private LocalDateTime timestamp = LocalDateTime.now();

    public ActivityLog() {}

    public ActivityLog(String action, String performedBy) {
        this.action = action;
        this.performedBy = performedBy;
    }

    public Long getId() { return id; }

    public String getAction() { return action; }

    public String getPerformedBy() { return performedBy; }

    public LocalDateTime getTimestamp() { return timestamp; }
}
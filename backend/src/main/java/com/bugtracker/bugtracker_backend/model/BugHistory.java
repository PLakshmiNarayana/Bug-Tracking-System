package com.bugtracker.bugtracker_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class BugHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;

    private String performedBy;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "bug_id")
    private Bug bug;

    public BugHistory() {
        this.timestamp = LocalDateTime.now();
    }

    public BugHistory(String action, String performedBy, Bug bug) {
        this.action = action;
        this.performedBy = performedBy;
        this.bug = bug;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public Bug getBug() {
        return bug;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public void setBug(Bug bug) {
        this.bug = bug;
    }
}
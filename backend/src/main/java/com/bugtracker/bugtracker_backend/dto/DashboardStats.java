package com.bugtracker.bugtracker_backend.dto;

public class DashboardStats {

    private long totalBugs;
    private long openBugs;
    private long resolvedBugs;
    private long criticalBugs;

    public DashboardStats(long totalBugs, long openBugs, long resolvedBugs, long criticalBugs) {
        this.totalBugs = totalBugs;
        this.openBugs = openBugs;
        this.resolvedBugs = resolvedBugs;
        this.criticalBugs = criticalBugs;
    }

    public long getTotalBugs() {
        return totalBugs;
    }

    public long getOpenBugs() {
        return openBugs;
    }

    public long getResolvedBugs() {
        return resolvedBugs;
    }

    public long getCriticalBugs() {
        return criticalBugs;
    }
}
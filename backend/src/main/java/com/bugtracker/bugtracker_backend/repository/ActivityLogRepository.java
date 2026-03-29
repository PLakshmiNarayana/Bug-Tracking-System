package com.bugtracker.bugtracker_backend.repository;

import com.bugtracker.bugtracker_backend.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}
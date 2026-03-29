package com.bugtracker.bugtracker_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bugtracker.bugtracker_backend.model.Build;

public interface BuildRepository extends JpaRepository<Build, Long> {

}
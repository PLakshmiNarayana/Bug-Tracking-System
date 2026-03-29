package com.bugtracker.bugtracker_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.bugtracker_backend.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByBug_Id(Long bugId);

}
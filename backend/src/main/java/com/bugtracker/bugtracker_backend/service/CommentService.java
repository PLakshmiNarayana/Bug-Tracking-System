package com.bugtracker.bugtracker_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.bugtracker_backend.model.Comment;
import com.bugtracker.bugtracker_backend.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    
    public List<Comment> getCommentsByBugId(Long bugId) {
        return commentRepository.findByBug_Id(bugId);
    }
}
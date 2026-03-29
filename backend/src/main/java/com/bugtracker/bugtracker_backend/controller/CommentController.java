package com.bugtracker.bugtracker_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.bugtracker.bugtracker_backend.model.Comment;
import com.bugtracker.bugtracker_backend.model.Bug;
import com.bugtracker.bugtracker_backend.model.User;
import com.bugtracker.bugtracker_backend.repository.BugRepository;
import com.bugtracker.bugtracker_backend.repository.UserRepository;
import com.bugtracker.bugtracker_backend.service.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private BugRepository bugRepository;

    @Autowired
    private UserRepository userRepository;

    // Add comment
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TESTER','DEVELOPER')")
    public Comment addComment(@RequestBody Comment comment) {

        Long bugId = comment.getBug().getId();
        Long userId = comment.getUser().getId();

        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        comment.setBug(bug);
        comment.setUser(user);

        return commentService.addComment(comment);
    }

    // Get all comments
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TESTER','DEVELOPER')")
    public List<Comment> getComments() {
        return commentService.getAllComments();
    }

    // Get comments by bug
    @GetMapping("/bug/{bugId}")
    @PreAuthorize("hasAnyRole('ADMIN','TESTER','DEVELOPER')")
    public List<Comment> getCommentsByBug(@PathVariable Long bugId) {
        return commentService.getCommentsByBugId(bugId);
    }
}
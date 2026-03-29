package com.bugtracker.bugtracker_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bugtracker.bugtracker_backend.dto.LoginRequest;
import com.bugtracker.bugtracker_backend.dto.AuthResponse;
import com.bugtracker.bugtracker_backend.dto.RegisterRequest;
import com.bugtracker.bugtracker_backend.model.User;
import com.bugtracker.bugtracker_backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;


    // Register User
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        return authService.register(request);

    }


    // Login User
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        String token = authService.login(request.getEmail(), request.getPassword());

        return new AuthResponse(token);
    }

}
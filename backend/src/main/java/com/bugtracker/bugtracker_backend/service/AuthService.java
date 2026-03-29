package com.bugtracker.bugtracker_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bugtracker.bugtracker_backend.dto.RegisterRequest;
import com.bugtracker.bugtracker_backend.enums.Role;
import com.bugtracker.bugtracker_backend.model.User;
import com.bugtracker.bugtracker_backend.repository.UserRepository;
import com.bugtracker.bugtracker_backend.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Register new user
    public User register(RegisterRequest request) {

        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("User already exists with this email");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Convert role string to enum
        user.setRole(Role.valueOf(request.getRole()));

        return userRepository.save(user);
    }


    // Login user
    public String login(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(email);
    }

}
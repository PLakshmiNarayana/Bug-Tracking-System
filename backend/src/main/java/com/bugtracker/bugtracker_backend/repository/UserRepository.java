package com.bugtracker.bugtracker_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bugtracker.bugtracker_backend.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);
	
	Optional<User> findByResetToken(String resetToken);
}
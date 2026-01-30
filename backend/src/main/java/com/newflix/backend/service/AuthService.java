package com.newflix.backend.service;

import com.newflix.backend.dto.AuthResponse;
import com.newflix.backend.dto.SignInRequest;
import com.newflix.backend.dto.SignUpRequest;
import com.newflix.backend.dto.UserData;
import com.newflix.backend.model.User;
import com.newflix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse signUp(SignUpRequest request) {
        try {
            // Check if username already exists
            if (userRepository.existsByUsername(request.getUsername())) {
                return new AuthResponse(false, "Username already exists!");
            }

            // Check if email already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                return new AuthResponse(false, "Email already exists!");
            }

            // Create new user
            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            // Save user to database
            User savedUser = userRepository.save(user);

            // Create user data response
            UserData userData = new UserData(
                    savedUser.getId(),
                    savedUser.getUsername(),
                    savedUser.getEmail(),
                    savedUser.getCreatedAt(),
                    savedUser.getSubscriptionPlan(),
                    savedUser.getSubscriptionStatus(),
                    savedUser.getSubscriptionEndDate());

            return new AuthResponse(true, "Account created successfully!", userData);

        } catch (Exception e) {
            return new AuthResponse(false, "Error creating account: " + e.getMessage());
        }
    }

    public AuthResponse signIn(SignInRequest request) {
        try {
            // Find user by username
            Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

            if (userOptional.isEmpty()) {
                return new AuthResponse(false, "Invalid username or password!");
            }

            User user = userOptional.get();

            // Verify password
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return new AuthResponse(false, "Invalid username or password!");
            }

            // Create user data response
            UserData userData = new UserData(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getCreatedAt(),
                    user.getSubscriptionPlan(),
                    user.getSubscriptionStatus(),
                    user.getSubscriptionEndDate());

            return new AuthResponse(true, "Login successful!", userData);

        } catch (Exception e) {
            return new AuthResponse(false, "Error during login: " + e.getMessage());
        }
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}

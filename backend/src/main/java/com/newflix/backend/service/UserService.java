package com.newflix.backend.service;

import com.newflix.backend.dto.SubscriptionRequest;
import com.newflix.backend.dto.UpdateProfileRequest;
import com.newflix.backend.dto.UserData;
import com.newflix.backend.model.User;
import com.newflix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<UserData> getUserProfile(String username) {
        return userRepository.findByUsername(username)
                .map(this::mapToUserData);
    }

    public UserData updateProfile(String username, UpdateProfileRequest request) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
                throw new Exception("Email already in use");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getNewPassword() != null && !request.getNewPassword().isEmpty()) {
            if (request.getCurrentPassword() == null
                    || !passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new Exception("Invalid current password");
            }
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        User updatedUser = userRepository.save(user);
        return mapToUserData(updatedUser);
    }

    public UserData updateSubscription(String username, SubscriptionRequest request) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));

        user.setSubscriptionPlan(request.getPlan());
        user.setSubscriptionStatus("ACTIVE");

        // Calculate end date (simplified logic)
        LocalDateTime now = LocalDateTime.now();
        if (user.getSubscriptionEndDate() != null && user.getSubscriptionEndDate().isAfter(now)) {
            // Extend existing
            user.setSubscriptionEndDate(user.getSubscriptionEndDate().plusMonths(request.getDurationMonths()));
        } else {
            // New subscription
            user.setSubscriptionEndDate(now.plusMonths(request.getDurationMonths()));
        }

        User updatedUser = userRepository.save(user);
        return mapToUserData(updatedUser);
    }

    private UserData mapToUserData(User user) {
        return new UserData(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getSubscriptionPlan(),
                user.getSubscriptionStatus(),
                user.getSubscriptionEndDate());
    }

    public User getFullUser(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}

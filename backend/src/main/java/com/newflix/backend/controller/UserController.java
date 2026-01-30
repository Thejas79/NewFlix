package com.newflix.backend.controller;

import com.newflix.backend.dto.SubscriptionRequest;
import com.newflix.backend.dto.UpdateProfileRequest;
import com.newflix.backend.dto.UserData;
import com.newflix.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserProfile(@PathVariable String username) {
        return userService.getUserProfile(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{username}/update")
    public ResponseEntity<?> updateProfile(@PathVariable String username, @RequestBody UpdateProfileRequest request) {
        try {
            UserData updatedUser = userService.updateProfile(username, request);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{username}/subscribe")
    public ResponseEntity<?> updateSubscription(@PathVariable String username,
            @RequestBody SubscriptionRequest request) {
        try {
            UserData updatedUser = userService.updateSubscription(username, request);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

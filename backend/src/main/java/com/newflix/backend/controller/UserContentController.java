package com.newflix.backend.controller;

import com.newflix.backend.dto.ContentRequest;
import com.newflix.backend.model.UserContent;
import com.newflix.backend.service.UserContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class UserContentController {

    @Autowired
    private UserContentService userContentService;

    @PostMapping("/like")
    public ResponseEntity<?> toggleLike(@RequestBody ContentRequest request) {
        boolean success = userContentService.toggleLike(request);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Like status updated"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User not found"));
        }
    }

    @PostMapping("/watchlist")
    public ResponseEntity<?> toggleWatchlist(@RequestBody ContentRequest request) {
        boolean success = userContentService.toggleWatchlist(request);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Watchlist updated"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User not found"));
        }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<UserContent>> getUserContent(@PathVariable String username) {
        return ResponseEntity.ok(userContentService.getAllUserContent(username));
    }

    @GetMapping("/watchlist/{username}")
    public ResponseEntity<List<UserContent>> getWatchlist(@PathVariable String username) {
        return ResponseEntity.ok(userContentService.getUserWatchlist(username));
    }
}

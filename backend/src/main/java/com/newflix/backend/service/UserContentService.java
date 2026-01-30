package com.newflix.backend.service;

import com.newflix.backend.dto.ContentRequest;
import com.newflix.backend.model.User;
import com.newflix.backend.model.UserContent;
import com.newflix.backend.repository.UserContentRepository;
import com.newflix.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserContentService {

    @Autowired
    private UserContentRepository userContentRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public boolean toggleLike(ContentRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty())
            return false;

        User user = userOpt.get();
        Optional<UserContent> contentOpt = userContentRepository.findByUserAndContentIdAndContentType(
                user, request.getContentId(), request.getContentType());

        UserContent content;
        if (contentOpt.isPresent()) {
            content = contentOpt.get();
        } else {
            content = new UserContent(user, request.getContentId(), request.getContentType(), request.getTitle(),
                    request.getPosterPath());
        }

        content.setLiked(request.isStatus());
        content.setTitle(request.getTitle()); // Update basic info if changed
        content.setPosterPath(request.getPosterPath());

        userContentRepository.save(content);
        return true;
    }

    @Transactional
    public boolean toggleWatchlist(ContentRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty())
            return false;

        User user = userOpt.get();
        Optional<UserContent> contentOpt = userContentRepository.findByUserAndContentIdAndContentType(
                user, request.getContentId(), request.getContentType());

        UserContent content;
        if (contentOpt.isPresent()) {
            content = contentOpt.get();
        } else {
            content = new UserContent(user, request.getContentId(), request.getContentType(), request.getTitle(),
                    request.getPosterPath());
        }

        content.setInWatchlist(request.isStatus());
        content.setTitle(request.getTitle());
        content.setPosterPath(request.getPosterPath());

        userContentRepository.save(content);
        return true;
    }

    public List<UserContent> getUserWatchlist(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            return List.of();

        return userContentRepository.findByUserAndIsInWatchlistTrue(userOpt.get());
    }

    public List<UserContent> getUserLikes(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            return List.of();

        return userContentRepository.findByUserAndIsLikedTrue(userOpt.get());
    }

    // Get all content interaction for a user to sync state
    public List<UserContent> getAllUserContent(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            return List.of();

        return userContentRepository.findByUser(userOpt.get());
    }
}

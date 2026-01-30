package com.newflix.backend.repository;

import com.newflix.backend.model.User;
import com.newflix.backend.model.UserContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserContentRepository extends JpaRepository<UserContent, Long> {

    Optional<UserContent> findByUserAndContentIdAndContentType(User user, String contentId, String contentType);

    List<UserContent> findByUserAndIsLikedTrue(User user);

    List<UserContent> findByUserAndIsInWatchlistTrue(User user);

    List<UserContent> findByUser(User user);
}

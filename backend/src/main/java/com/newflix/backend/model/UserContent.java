package com.newflix.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_content", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "content_id", "content_type" })
})
public class UserContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content_id", nullable = false)
    private String contentId;

    @Column(name = "content_type", nullable = false)
    private String contentType; // "movie" or "tv"

    @Column(name = "title")
    private String title;

    @Column(name = "poster_path")
    private String posterPath;

    @com.fasterxml.jackson.annotation.JsonProperty("liked")
    @Column(name = "is_liked")
    private boolean isLiked = false;

    @com.fasterxml.jackson.annotation.JsonProperty("inWatchlist")
    @Column(name = "is_in_watchlist")
    private boolean isInWatchlist = false;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public UserContent() {
    }

    public UserContent(User user, String contentId, String contentType, String title, String posterPath) {
        this.user = user;
        this.contentId = contentId;
        this.contentType = contentType;
        this.title = title;
        this.posterPath = posterPath;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContentId() {
        return contentId;
    }

    public void setContentId(String contentId) {
        this.contentId = contentId;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public boolean isLiked() {
        return isLiked;
    }

    public void setLiked(boolean liked) {
        isLiked = liked;
    }

    public boolean isInWatchlist() {
        return isInWatchlist;
    }

    public void setInWatchlist(boolean inWatchlist) {
        isInWatchlist = inWatchlist;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

package com.newflix.backend.dto;

import java.time.LocalDateTime;

public class UserData {

    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    private String subscriptionPlan;
    private String subscriptionStatus;
    private LocalDateTime subscriptionEndDate;

    // Default constructor
    public UserData() {
    }

    // Legacy Constructor
    public UserData(Long id, String username, String email, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
    }

    // Extended constructor
    public UserData(Long id, String username, String email, LocalDateTime createdAt, String subscriptionPlan,
            String subscriptionStatus, LocalDateTime subscriptionEndDate) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
        this.subscriptionPlan = subscriptionPlan;
        this.subscriptionStatus = subscriptionStatus;
        this.subscriptionEndDate = subscriptionEndDate;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getSubscriptionPlan() {
        return subscriptionPlan;
    }

    public void setSubscriptionPlan(String subscriptionPlan) {
        this.subscriptionPlan = subscriptionPlan;
    }

    public String getSubscriptionStatus() {
        return subscriptionStatus;
    }

    public void setSubscriptionStatus(String subscriptionStatus) {
        this.subscriptionStatus = subscriptionStatus;
    }

    public LocalDateTime getSubscriptionEndDate() {
        return subscriptionEndDate;
    }

    public void setSubscriptionEndDate(LocalDateTime subscriptionEndDate) {
        this.subscriptionEndDate = subscriptionEndDate;
    }
}

package com.newflix.backend.dto;

public class AuthResponse {

    private boolean success;
    private String message;
    private UserData user;

    // Default constructor
    public AuthResponse() {
    }

    // Constructor with all fields
    public AuthResponse(boolean success, String message, UserData user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    // Constructor without user (for error responses)
    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.user = null;
    }

    // Getters and setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }
}

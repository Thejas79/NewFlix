package com.newflix.backend.dto;

public class ContentRequest {

    private String username;
    private String contentId;
    private String contentType;
    private String title;
    private String posterPath;
    private boolean status; // true = active (liked/added), false = inactive (unliked/removed)

    public ContentRequest() {
    }

    public ContentRequest(String username, String contentId, String contentType, String title, String posterPath,
            boolean status) {
        this.username = username;
        this.contentId = contentId;
        this.contentType = contentType;
        this.title = title;
        this.posterPath = posterPath;
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}

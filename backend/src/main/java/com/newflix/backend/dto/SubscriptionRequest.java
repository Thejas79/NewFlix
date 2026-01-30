package com.newflix.backend.dto;

public class SubscriptionRequest {
    private String plan; // Basic, Standard, Premium, Ultimate
    private int durationMonths;

    public SubscriptionRequest() {
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public int getDurationMonths() {
        return durationMonths;
    }

    public void setDurationMonths(int durationMonths) {
        this.durationMonths = durationMonths;
    }
}

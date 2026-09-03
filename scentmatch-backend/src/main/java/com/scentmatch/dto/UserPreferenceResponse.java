package com.scentmatch.dto;

public class UserPreferenceResponse {

    private Long id;
    private String fragranceFamily;
    private String occasion;
    private String season;
    private String intensity;
    private String longevity;
    private String gender;
    private String priceRange;
    private String preferredNotes;

    public UserPreferenceResponse() {
    }

    public UserPreferenceResponse(
            Long id,
            String fragranceFamily,
            String occasion,
            String season,
            String intensity,
            String longevity,
            String gender,
            String priceRange,
            String preferredNotes) {

        this.id = id;
        this.fragranceFamily = fragranceFamily;
        this.occasion = occasion;
        this.season = season;
        this.intensity = intensity;
        this.longevity = longevity;
        this.gender = gender;
        this.priceRange = priceRange;
        this.preferredNotes = preferredNotes;
    }

    public Long getId() {
        return id;
    }

    public String getFragranceFamily() {
        return fragranceFamily;
    }

    public String getOccasion() {
        return occasion;
    }

    public String getSeason() {
        return season;
    }

    public String getIntensity() {
        return intensity;
    }

    public String getLongevity() {
        return longevity;
    }

    public String getGender() {
        return gender;
    }

    public String getPriceRange() {
        return priceRange;
    }

    public String getPreferredNotes() {
        return preferredNotes;
    }
}
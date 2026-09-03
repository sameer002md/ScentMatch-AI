package com.scentmatch.dto;

public class RecommendationRequest {

    private String gender;
    private String fragranceFamily;
    private String season;
    private String occasion;
    private Double budget;
    private String longevity;
    private String sillage;


    public RecommendationRequest() {
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getFragranceFamily() {
        return fragranceFamily;
    }

    public void setFragranceFamily(String fragranceFamily) {
        this.fragranceFamily = fragranceFamily;
    }


    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }


    public String getOccasion() {
        return occasion;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }


    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }


    public String getLongevity() {
        return longevity;
    }

    public void setLongevity(String longevity) {
        this.longevity = longevity;
    }


    public String getSillage() {
        return sillage;
    }

    public void setSillage(String sillage) {
        this.sillage = sillage;
    }
}
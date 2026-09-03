package com.scentmatch.dto;

public class RecommendationResponse {

    private Long perfumeId;

    private String name;

    private String brand;

    private String gender;

    private String fragranceFamily;

    private String imageUrl;

    private Double price;

    private String description;


    // =========================
    // MATCH SCORES
    // =========================

    private double matchScore;

    private double genderScore;

    private double familyScore;

    private double occasionScore;

    private double seasonScore;

    private double longevityScore;

    private double sillageScore;

    private double priceScore;


    // =========================
    // AI EXPLANATION
    // =========================

    private String aiExplanation;


    public RecommendationResponse() {
    }


    // =========================
    // PERFUME GETTERS & SETTERS
    // =========================

    public Long getPerfumeId() {
        return perfumeId;
    }

    public void setPerfumeId(Long perfumeId) {
        this.perfumeId = perfumeId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
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


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    // =========================
    // SCORE GETTERS & SETTERS
    // =========================

    public double getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(double matchScore) {
        this.matchScore = matchScore;
    }


    public double getGenderScore() {
        return genderScore;
    }

    public void setGenderScore(double genderScore) {
        this.genderScore = genderScore;
    }


    public double getFamilyScore() {
        return familyScore;
    }

    public void setFamilyScore(double familyScore) {
        this.familyScore = familyScore;
    }


    public double getOccasionScore() {
        return occasionScore;
    }

    public void setOccasionScore(double occasionScore) {
        this.occasionScore = occasionScore;
    }


    public double getSeasonScore() {
        return seasonScore;
    }

    public void setSeasonScore(double seasonScore) {
        this.seasonScore = seasonScore;
    }


    public double getLongevityScore() {
        return longevityScore;
    }

    public void setLongevityScore(double longevityScore) {
        this.longevityScore = longevityScore;
    }


    public double getSillageScore() {
        return sillageScore;
    }

    public void setSillageScore(double sillageScore) {
        this.sillageScore = sillageScore;
    }


    public double getPriceScore() {
        return priceScore;
    }

    public void setPriceScore(double priceScore) {
        this.priceScore = priceScore;
    }


    // =========================
    // AI EXPLANATION
    // =========================

    public String getAiExplanation() {
        return aiExplanation;
    }

    public void setAiExplanation(String aiExplanation) {
        this.aiExplanation = aiExplanation;
    }
}
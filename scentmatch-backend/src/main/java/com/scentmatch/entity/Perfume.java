package com.scentmatch.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "perfumes")
public class Perfume {


    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;


    @Column(nullable = false)
    private String name;


    @Column(nullable = false)
    private String brand;


    private String gender;

    private String fragranceFamily;

    private String topNotes;

    private String middleNotes;

    private String baseNotes;

    private String occasion;

    private String season;

    private String longevity;

    private String sillage;

    private Double price;


    @Column(length = 1000)
    private String description;


    private String imageUrl;


    public Perfume() {
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
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


    public void setFragranceFamily(
            String fragranceFamily
    ) {
        this.fragranceFamily =
                fragranceFamily;
    }


    public String getTopNotes() {
        return topNotes;
    }


    public void setTopNotes(
            String topNotes
    ) {
        this.topNotes = topNotes;
    }


    public String getMiddleNotes() {
        return middleNotes;
    }


    public void setMiddleNotes(
            String middleNotes
    ) {
        this.middleNotes = middleNotes;
    }


    public String getBaseNotes() {
        return baseNotes;
    }


    public void setBaseNotes(
            String baseNotes
    ) {
        this.baseNotes = baseNotes;
    }


    public String getOccasion() {
        return occasion;
    }


    public void setOccasion(
            String occasion
    ) {
        this.occasion = occasion;
    }


    public String getSeason() {
        return season;
    }


    public void setSeason(
            String season
    ) {
        this.season = season;
    }


    public String getLongevity() {
        return longevity;
    }


    public void setLongevity(
            String longevity
    ) {
        this.longevity = longevity;
    }


    public String getSillage() {
        return sillage;
    }


    public void setSillage(
            String sillage
    ) {
        this.sillage = sillage;
    }


    public Double getPrice() {
        return price;
    }


    public void setPrice(
            Double price
    ) {
        this.price = price;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(
            String description
    ) {
        this.description = description;
    }


    public String getImageUrl() {
        return imageUrl;
    }


    public void setImageUrl(
            String imageUrl
    ) {
        this.imageUrl = imageUrl;
    }

}
package com.scentmatch.service;

import com.scentmatch.dto.RecommendationRequest;
import com.scentmatch.dto.RecommendationResponse;
import com.scentmatch.entity.Perfume;
import com.scentmatch.repository.PerfumeRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class RecommendationService {

    private final PerfumeRepository perfumeRepository;

    public RecommendationService(
            PerfumeRepository perfumeRepository) {

        this.perfumeRepository = perfumeRepository;
    }


    // =========================================================
    // MAIN RECOMMENDATION METHOD
    // =========================================================

    public List<RecommendationResponse> recommend(
            RecommendationRequest request) {

        List<Perfume> perfumes =
                perfumeRepository.findAll();

        List<RecommendationResponse> recommendations =
                new ArrayList<>();


        for (Perfume perfume : perfumes) {

            RecommendationResponse response =
                    new RecommendationResponse();


            // =================================================
            // PERFUME DETAILS
            // =================================================

            response.setPerfumeId(
                    perfume.getId()
            );

            response.setName(
                    perfume.getName()
            );

            response.setBrand(
                    perfume.getBrand()
            );

            response.setGender(
                    perfume.getGender()
            );

            response.setFragranceFamily(
                    perfume.getFragranceFamily()
            );

            response.setImageUrl(
                    perfume.getImageUrl()
            );

            response.setPrice(
                    perfume.getPrice()
            );

            response.setDescription(
                    perfume.getDescription()
            );


            // =================================================
            // CALCULATE INDIVIDUAL SCORES
            // =================================================

            double genderScore =
                    calculateGenderScore(
                            request.getGender(),
                            perfume.getGender()
                    );


            double familyScore =
                    calculateExactScore(
                            request.getFragranceFamily(),
                            perfume.getFragranceFamily(),
                            25
                    );


            double occasionScore =
                    calculateExactScore(
                            request.getOccasion(),
                            perfume.getOccasion(),
                            20
                    );


            double seasonScore =
                    calculateSeasonScore(
                            request.getSeason(),
                            perfume.getSeason()
                    );


            double longevityScore =
                    calculateLongevityScore(
                            request.getLongevity(),
                            perfume.getLongevity()
                    );


            double sillageScore =
                    calculateSillageScore(
                            request.getSillage(),
                            perfume.getSillage()
                    );


            double priceScore =
                    calculatePriceScore(
                            request.getBudget(),
                            perfume.getPrice()
                    );


            // =================================================
            // TOTAL SCORE
            // =================================================

            double totalScore =
                    genderScore
                    + familyScore
                    + occasionScore
                    + seasonScore
                    + longevityScore
                    + sillageScore
                    + priceScore;


            // =================================================
            // SAVE SCORES
            // =================================================

            response.setGenderScore(
                    genderScore
            );

            response.setFamilyScore(
                    familyScore
            );

            response.setOccasionScore(
                    occasionScore
            );

            response.setSeasonScore(
                    seasonScore
            );

            response.setLongevityScore(
                    longevityScore
            );

            response.setSillageScore(
                    sillageScore
            );

            response.setPriceScore(
                    priceScore
            );

            response.setMatchScore(
                    Math.round(totalScore)
            );


            // =================================================
            // AI EXPLANATION
            // =================================================

            response.setAiExplanation(
                    generateExplanation(
                            perfume,
                            request,
                            totalScore
                    )
            );


            recommendations.add(
                    response
            );
        }


        // =====================================================
        // SORT: HIGHEST SCORE FIRST
        // =====================================================

        recommendations.sort(
                Comparator
                        .comparingDouble(
                                RecommendationResponse
                                        ::getMatchScore
                        )
                        .reversed()
                        .thenComparing(
                                RecommendationResponse
                                        ::getName,
                                Comparator.nullsLast(
                                        String::compareToIgnoreCase
                                )
                        )
        );


        // =====================================================
        // RETURN TOP 5
        // =====================================================

        if (recommendations.size() > 5) {

            return new ArrayList<>(
                    recommendations.subList(
                            0,
                            5
                    )
            );
        }


        return recommendations;
    }


    // =========================================================
    // GENDER SCORE
    // MAXIMUM = 5
    // =========================================================

    private double calculateGenderScore(
            String requestedGender,
            String perfumeGender) {

        if (isEmpty(requestedGender)
                || isEmpty(perfumeGender)) {

            return 0;
        }


        if (matches(
                requestedGender,
                perfumeGender
        )) {

            return 5;
        }


        // Unisex perfume can match everyone
        if (normalize(perfumeGender)
                .contains("unisex")) {

            return 4;
        }


        return 0;
    }


    // =========================================================
    // EXACT SCORE
    // =========================================================

    private double calculateExactScore(
            String requestedValue,
            String perfumeValue,
            double maximumScore) {

        if (isEmpty(requestedValue)
                || isEmpty(perfumeValue)) {

            return 0;
        }


        if (matches(
                requestedValue,
                perfumeValue
        )) {

            return maximumScore;
        }


        // Partial text match
        if (normalize(perfumeValue)
                .contains(
                        normalize(requestedValue)
                )) {

            return maximumScore * 0.60;
        }


        return 0;
    }


    // =========================================================
    // SEASON SCORE
    // MAXIMUM = 15
    // =========================================================

    private double calculateSeasonScore(
            String requestedSeason,
            String perfumeSeason) {

        if (isEmpty(requestedSeason)
                || isEmpty(perfumeSeason)) {

            return 0;
        }


        String requested =
                normalize(requestedSeason);

        String perfume =
                normalize(perfumeSeason);


        // User selected All Season
        if (requested.contains("all season")) {

            return 10;
        }


        // Perfume suitable for all seasons
        if (perfume.contains("all season")
                || perfume.contains("all-season")) {

            return 15;
        }


        if (matches(
                requestedSeason,
                perfumeSeason
        )) {

            return 15;
        }


        return 0;
    }


    // =========================================================
    // LONGEVITY SCORE
    // MAXIMUM = 10
    // =========================================================

    private double calculateLongevityScore(
            String requestedLongevity,
            String perfumeLongevity) {

        if (isEmpty(requestedLongevity)
                || isEmpty(perfumeLongevity)) {

            return 0;
        }


        if (matches(
                requestedLongevity,
                perfumeLongevity
        )) {

            return 10;
        }


        int requestedLevel =
                getLongevityLevel(
                        requestedLongevity
                );

        int perfumeLevel =
                getLongevityLevel(
                        perfumeLongevity
                );


        if (requestedLevel == 0
                || perfumeLevel == 0) {

            return 0;
        }


        int difference =
                Math.abs(
                        requestedLevel
                        - perfumeLevel
                );


        if (difference == 1) {

            return 6;
        }


        return 0;
    }


    // =========================================================
    // SILLAGE SCORE
    // MAXIMUM = 15
    // =========================================================

    private double calculateSillageScore(
            String requestedSillage,
            String perfumeSillage) {

        if (isEmpty(requestedSillage)
                || isEmpty(perfumeSillage)) {

            return 0;
        }


        if (matches(
                requestedSillage,
                perfumeSillage
        )) {

            return 15;
        }


        int requestedLevel =
                getSillageLevel(
                        requestedSillage
                );

        int perfumeLevel =
                getSillageLevel(
                        perfumeSillage
                );


        if (requestedLevel == 0
                || perfumeLevel == 0) {

            return 0;
        }


        int difference =
                Math.abs(
                        requestedLevel
                        - perfumeLevel
                );


        if (difference == 1) {

            return 8;
        }


        return 0;
    }


    // =========================================================
    // PRICE SCORE
    // MAXIMUM = 10
    // =========================================================

    private double calculatePriceScore(
            Double budget,
            Double perfumePrice) {

        if (budget == null
                || perfumePrice == null) {

            return 0;
        }


        if (perfumePrice <= budget) {

            return 10;
        }


        // Slightly above budget
        if (perfumePrice
                <= budget * 1.10) {

            return 7;
        }


        // Moderately above budget
        if (perfumePrice
                <= budget * 1.25) {

            return 3;
        }


        return 0;
    }


    // =========================================================
    // LONGEVITY LEVEL
    // =========================================================

    private int getLongevityLevel(
            String longevity) {

        String value =
                normalize(longevity);


        if (value.contains("low")) {

            return 1;
        }


        if (value.contains("medium")) {

            return 2;
        }


        if (value.equals("long")
                || value.contains("long")) {

            return 3;
        }


        if (value.contains("very long")) {

            return 4;
        }


        return 0;
    }


    // =========================================================
    // SILLAGE LEVEL
    // =========================================================

    private int getSillageLevel(
            String sillage) {

        String value =
                normalize(sillage);


        if (value.contains("soft")) {

            return 1;
        }


        if (value.contains("moderate")) {

            return 2;
        }


        if (value.equals("strong")
                || value.contains("strong")) {

            return 3;
        }


        if (value.contains("very strong")) {

            return 4;
        }


        return 0;
    }


    // =========================================================
    // GENERATE AI EXPLANATION
    // =========================================================

    private String generateExplanation(
            Perfume perfume,
            RecommendationRequest request,
            double score) {

        StringBuilder explanation =
                new StringBuilder();


        explanation.append(
                perfume.getName()
        );

        explanation.append(
                " is a "
        );


        if (score >= 80) {

            explanation.append(
                    "strong match"
            );

        } else if (score >= 60) {

            explanation.append(
                    "good match"
            );

        } else if (score >= 40) {

            explanation.append(
                    "moderate match"
            );

        } else {

            explanation.append(
                    "possible match"
            );
        }


        explanation.append(
                " based on your fragrance preferences."
        );


        List<String> matches =
                new ArrayList<>();


        if (safeMatches(
                request.getFragranceFamily(),
                perfume.getFragranceFamily()
        )) {

            matches.add(
                    "fragrance family"
            );
        }


        if (safeMatches(
                request.getOccasion(),
                perfume.getOccasion()
        )) {

            matches.add(
                    "occasion"
            );
        }


        if (safeMatches(
                request.getSeason(),
                perfume.getSeason()
        )) {

            matches.add(
                    "season"
            );
        }


        if (request.getBudget() != null
                && perfume.getPrice() != null
                && perfume.getPrice()
                <= request.getBudget()) {

            matches.add(
                    "budget"
            );
        }


        if (!matches.isEmpty()) {

            explanation.append(
                    " It matches your "
            );


            explanation.append(
                    String.join(
                            ", ",
                            matches
                    )
            );

            explanation.append(
                    "."
            );
        }


        return explanation.toString();
    }


    // =========================================================
    // SAFE MATCH
    // =========================================================

    private boolean safeMatches(
            String valueOne,
            String valueTwo) {

        if (isEmpty(valueOne)
                || isEmpty(valueTwo)) {

            return false;
        }


        return matches(
                valueOne,
                valueTwo
        );
    }


    // =========================================================
    // STRING MATCH
    // =========================================================

    private boolean matches(
            String valueOne,
            String valueTwo) {

        if (isEmpty(valueOne)
                || isEmpty(valueTwo)) {

            return false;
        }


        return normalize(valueOne)
                .equals(
                        normalize(valueTwo)
                );
    }


    // =========================================================
    // NORMALIZE STRING
    // =========================================================

    private String normalize(
            String value) {

        if (value == null) {

            return "";
        }


        return value
                .trim()
                .toLowerCase();
    }


    // =========================================================
    // CHECK EMPTY
    // =========================================================

    private boolean isEmpty(
            String value) {

        return value == null
                || value.trim().isEmpty();
    }

}
package com.scentmatch.service;

import com.scentmatch.dto.RecommendationRequest;
import com.scentmatch.entity.Perfume;
import com.scentmatch.repository.PerfumeRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class AIRecommendationService {

    private final PerfumeRepository perfumeRepository;


    public AIRecommendationService(
            PerfumeRepository perfumeRepository
    ) {

        this.perfumeRepository =
                perfumeRepository;
    }


    // ==========================================
    // MAIN RECOMMENDATION METHOD
    // ==========================================

    public List<Perfume> recommendPerfumes(
            RecommendationRequest request
    ) {

        // Get all perfumes from database

        List<Perfume> perfumes =
                perfumeRepository.findAll();


        // Store perfumes with scores

        List<ScoredPerfume> scoredPerfumes =
                new ArrayList<>();


        // Check every perfume

        for (Perfume perfume : perfumes) {

            int score = calculateMatchScore(
                    perfume,
                    request
            );


            // Add only perfumes with some match

            if (score > 0) {

                scoredPerfumes.add(

                        new ScoredPerfume(
                                perfume,
                                score
                        )
                );
            }
        }


        // Sort by highest score

        scoredPerfumes.sort(

                Comparator.comparingInt(
                        ScoredPerfume::getScore
                ).reversed()
        );


        // Final recommended perfumes

        List<Perfume> recommendations =
                new ArrayList<>();


        // Return top 5

        int limit = Math.min(
                5,
                scoredPerfumes.size()
        );


        for (int i = 0; i < limit; i++) {

            recommendations.add(

                    scoredPerfumes
                            .get(i)
                            .getPerfume()
            );
        }


        return recommendations;
    }


    // ==========================================
    // MATCHING ALGORITHM
    // ==========================================

    private int calculateMatchScore(

            Perfume perfume,

            RecommendationRequest request

    ) {

        int score = 0;


        // ==========================================
        // FRAGRANCE FAMILY
        // ==========================================

        if (request.getFragranceFamily() != null
                && perfume.getFragranceFamily() != null
                && perfume.getFragranceFamily()
                .equalsIgnoreCase(
                        request.getFragranceFamily()
                )) {

            score += 25;
        }


        // ==========================================
        // GENDER
        // ==========================================

        if (request.getGender() != null
                && perfume.getGender() != null
                && perfume.getGender()
                .equalsIgnoreCase(
                        request.getGender()
                )) {

            score += 15;
        }


        // ==========================================
        // OCCASION
        // ==========================================

        if (request.getOccasion() != null
                && perfume.getOccasion() != null
                && perfume.getOccasion()
                .equalsIgnoreCase(
                        request.getOccasion()
                )) {

            score += 15;
        }


        // ==========================================
        // SEASON
        // ==========================================

        if (request.getSeason() != null
                && perfume.getSeason() != null
                && perfume.getSeason()
                .equalsIgnoreCase(
                        request.getSeason()
                )) {

            score += 10;
        }


        // ==========================================
        // LONGEVITY
        // ==========================================

        if (request.getLongevity() != null
                && perfume.getLongevity() != null
                && perfume.getLongevity()
                .equalsIgnoreCase(
                        request.getLongevity()
                )) {

            score += 15;
        }


        // ==========================================
        // SILLAGE
        // ==========================================

        if (request.getSillage() != null
                && perfume.getSillage() != null
                && perfume.getSillage()
                .equalsIgnoreCase(
                        request.getSillage()
                )) {

            score += 10;
        }


        // ==========================================
        // BUDGET
        // ==========================================

        if (request.getBudget() != null
                && perfume.getPrice() != null
                && perfume.getPrice()
                <= request.getBudget()) {

            score += 20;
        }


        return score;
    }


    // ==========================================
    // HELPER CLASS
    // ==========================================

    private static class ScoredPerfume {

        private Perfume perfume;

        private int score;


        public ScoredPerfume(

                Perfume perfume,

                int score

        ) {

            this.perfume =
                    perfume;

            this.score =
                    score;
        }


        public Perfume getPerfume() {

            return perfume;
        }


        public int getScore() {

            return score;
        }

    }

}
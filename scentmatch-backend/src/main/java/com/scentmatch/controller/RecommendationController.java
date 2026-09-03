package com.scentmatch.controller;

import com.scentmatch.dto.RecommendationRequest;
import com.scentmatch.dto.RecommendationResponse;
import com.scentmatch.service.RecommendationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:5173")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(
            RecommendationService recommendationService) {

        this.recommendationService =
                recommendationService;
    }


    @PostMapping
    public ResponseEntity<List<RecommendationResponse>>
    getRecommendations(
            @RequestBody RecommendationRequest request) {

        List<RecommendationResponse> recommendations =
                recommendationService.recommend(request);

        return ResponseEntity.ok(
                recommendations
        );
    }
}
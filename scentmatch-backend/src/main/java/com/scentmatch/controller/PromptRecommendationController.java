package com.scentmatch.controller;

import com.scentmatch.dto.AiPromptRequest;
import com.scentmatch.dto.RecommendationRequest;
import com.scentmatch.entity.Perfume;
import com.scentmatch.service.AiPromptService;
import com.scentmatch.service.AIRecommendationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class PromptRecommendationController {

    private final AiPromptService aiPromptService;

    private final AIRecommendationService aiRecommendationService;


    public PromptRecommendationController(

            AiPromptService aiPromptService,

            AIRecommendationService aiRecommendationService

    ) {

        this.aiPromptService =
                aiPromptService;

        this.aiRecommendationService =
                aiRecommendationService;
    }


    // ==========================================
    // AI PROMPT RECOMMENDATION
    // ==========================================

    @PostMapping("/recommend")
    public ResponseEntity<?> recommendPerfume(

            @RequestBody AiPromptRequest request

    ) {

        // Get user prompt

        String prompt =
                request.getPrompt();


        // AI analyzes prompt

        RecommendationRequest preferences =
                aiPromptService.analyzePrompt(
                        prompt
                );


        // Get perfume recommendations

        List<Perfume> recommendations =
                aiRecommendationService
                        .recommendPerfumes(
                                preferences
                        );


        return ResponseEntity.ok(
                recommendations
        );
    }

}
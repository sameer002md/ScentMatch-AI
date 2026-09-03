package com.scentmatch.controller;

import com.scentmatch.dto.UserPreferenceResponse;
import com.scentmatch.entity.UserPreference;
import com.scentmatch.service.UserPreferenceService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/preferences")
public class UserPreferenceController {

    private final UserPreferenceService userPreferenceService;

    public UserPreferenceController(
            UserPreferenceService userPreferenceService) {

        this.userPreferenceService = userPreferenceService;
    }

    @PostMapping
    public ResponseEntity<UserPreferenceResponse> savePreferences(
            @RequestBody UserPreference preference,
            Authentication authentication) {

        String email = authentication.getName();

        UserPreference savedPreference =
                userPreferenceService.savePreferences(
                        email,
                        preference
                );

        return new ResponseEntity<>(
                convertToResponse(savedPreference),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/me")
    public ResponseEntity<UserPreferenceResponse> getMyPreferences(
            Authentication authentication) {

        String email = authentication.getName();

        UserPreference preference =
                userPreferenceService.getMyPreferences(email);

        return ResponseEntity.ok(
                convertToResponse(preference)
        );
    }

    @PutMapping("/me")
    public ResponseEntity<UserPreferenceResponse> updatePreferences(
            @RequestBody UserPreference preference,
            Authentication authentication) {

        String email = authentication.getName();

        UserPreference updatedPreference =
                userPreferenceService.updatePreferences(
                        email,
                        preference
                );

        return ResponseEntity.ok(
                convertToResponse(updatedPreference)
        );
    }

    private UserPreferenceResponse convertToResponse(
            UserPreference preference) {

        return new UserPreferenceResponse(
                preference.getId(),
                preference.getFragranceFamily(),
                preference.getOccasion(),
                preference.getSeason(),
                preference.getIntensity(),
                preference.getLongevity(),
                preference.getGender(),
                preference.getPriceRange(),
                preference.getPreferredNotes()
        );
    }
}
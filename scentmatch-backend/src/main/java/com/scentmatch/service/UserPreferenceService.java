package com.scentmatch.service;

import com.scentmatch.entity.User;
import com.scentmatch.entity.UserPreference;
import com.scentmatch.repository.UserPreferenceRepository;
import com.scentmatch.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserPreferenceService {

    private final UserPreferenceRepository userPreferenceRepository;
    private final UserRepository userRepository;

    public UserPreferenceService(
            UserPreferenceRepository userPreferenceRepository,
            UserRepository userRepository) {

        this.userPreferenceRepository = userPreferenceRepository;
        this.userRepository = userRepository;
    }

    // CREATE / SAVE PREFERENCES
    public UserPreference savePreferences(
            String email,
            UserPreference preference) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (userPreferenceRepository.existsByUser(user)) {
            throw new RuntimeException(
                    "Preferences already exist for this user"
            );
        }

        preference.setUser(user);

        return userPreferenceRepository.save(preference);
    }

    // GET LOGGED-IN USER'S PREFERENCES
    public UserPreference getMyPreferences(
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return userPreferenceRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Preferences not found"
                        ));
    }

    // UPDATE PREFERENCES
    public UserPreference updatePreferences(
            String email,
            UserPreference updatedPreference) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        UserPreference existingPreference =
                userPreferenceRepository
                        .findByUser(user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                    "Preferences not found"
                                ));

        existingPreference.setFragranceFamily(
                updatedPreference.getFragranceFamily()
        );

        existingPreference.setOccasion(
                updatedPreference.getOccasion()
        );

        existingPreference.setSeason(
                updatedPreference.getSeason()
        );

        existingPreference.setIntensity(
                updatedPreference.getIntensity()
        );

        existingPreference.setLongevity(
                updatedPreference.getLongevity()
        );

        existingPreference.setGender(
                updatedPreference.getGender()
        );

        existingPreference.setPriceRange(
                updatedPreference.getPriceRange()
        );

        existingPreference.setPreferredNotes(
                updatedPreference.getPreferredNotes()
        );

        return userPreferenceRepository.save(
                existingPreference
        );
    }
}
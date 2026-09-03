package com.scentmatch.service;

import com.scentmatch.dto.RecommendationRequest;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AiPromptService {

    public RecommendationRequest analyzePrompt(String prompt) {

        RecommendationRequest request =
                new RecommendationRequest();

        if (prompt == null || prompt.trim().isEmpty()) {
            return request;
        }

        String text = prompt.toLowerCase();

        request.setFragranceFamily(
                detectFragranceFamily(text)
        );

        request.setGender(
                detectGender(text)
        );

        request.setOccasion(
                detectOccasion(text)
        );

        request.setSeason(
                detectSeason(text)
        );

        request.setLongevity(
                detectLongevity(text)
        );

        request.setSillage(
                detectSillage(text)
        );

        request.setBudget(
                detectBudget(text)
        );

        return request;
    }


    // ==========================================
    // FRAGRANCE FAMILY
    // ==========================================

    private String detectFragranceFamily(String text) {

        if (containsAny(text,
                "citrus",
                "lemon",
                "orange",
                "bergamot")) {

            return "Citrus";
        }

        if (containsAny(text,
                "fresh",
                "aquatic",
                "marine",
                "clean")) {

            return "Fresh";
        }

        if (containsAny(text,
                "woody",
                "wood",
                "sandalwood",
                "cedar")) {

            return "Woody";
        }

        if (containsAny(text,
                "floral",
                "flower",
                "rose",
                "jasmine")) {

            return "Floral";
        }

        if (containsAny(text,
                "oriental",
                "spicy",
                "amber")) {

            return "Oriental";
        }

        if (containsAny(text,
                "sweet",
                "vanilla",
                "caramel")) {

            return "Sweet";
        }

        return null;
    }


    // ==========================================
    // GENDER
    // ==========================================

    private String detectGender(String text) {

        if (containsAny(text,
                "for women",
                "female",
                "woman",
                "women")) {

            return "Women";
        }

        if (containsAny(text,
                "for men",
                "male",
                "man",
                "men")) {

            return "Men";
        }

        if (containsAny(text,
                "unisex",
                "everyone",
                "anyone")) {

            return "Unisex";
        }

        return null;
    }


    // ==========================================
    // OCCASION
    // ==========================================

    private String detectOccasion(String text) {

        if (containsAny(text,
                "office",
                "work",
                "professional")) {

            return "Office";
        }

        if (containsAny(text,
                "date",
                "romantic",
                "dating",
                "date night")) {

            return "Date";
        }

        if (containsAny(text,
                "party",
                "club",
                "night out")) {

            return "Party";
        }

        if (containsAny(text,
                "casual",
                "everyday",
                "daily")) {

            return "Casual";
        }

        if (containsAny(text,
                "special occasion",
                "wedding",
                "formal")) {

            return "Special Occasion";
        }

        return null;
    }


    // ==========================================
    // SEASON
    // ==========================================

    private String detectSeason(String text) {

        if (containsAny(text,
                "summer",
                "hot weather",
                "hot")) {

            return "Summer";
        }

        if (containsAny(text,
                "winter",
                "cold weather",
                "cold")) {

            return "Winter";
        }

        if (containsAny(text,
                "spring")) {

            return "Spring";
        }

        if (containsAny(text,
                "autumn",
                "fall")) {

            return "Autumn";
        }

        return null;
    }


    // ==========================================
    // LONGEVITY
    // ==========================================

    private String detectLongevity(String text) {

        if (containsAny(text,
                "very long",
                "all day",
                "all day long",
                "extremely long lasting")) {

            return "Very Long";
        }

        if (containsAny(text,
                "long lasting",
                "long-lasting")) {

            return "Long";
        }

        if (containsAny(text,
                "moderate",
                "medium")) {

            return "Medium";
        }

        if (containsAny(text,
                "short lasting",
                "short")) {

            return "Short";
        }

        return null;
    }


    // ==========================================
    // SILLAGE
    // ==========================================

    private String detectSillage(String text) {

        if (containsAny(text,
                "very strong",
                "very powerful",
                "beast mode")) {

            return "Very Strong";
        }

        if (containsAny(text,
                "strong",
                "powerful",
                "high projection")) {

            return "Strong";
        }

        if (containsAny(text,
                "moderate projection",
                "moderate")) {

            return "Moderate";
        }

        if (containsAny(text,
                "soft",
                "subtle",
                "light projection")) {

            return "Soft";
        }

        return null;
    }


    // ==========================================
    // BUDGET
    // ==========================================

    private Double detectBudget(String text) {

        Pattern pattern =
                Pattern.compile("(\\d{3,6})");

        Matcher matcher =
                pattern.matcher(text);

        if (matcher.find()) {

            try {

                return Double.parseDouble(
                        matcher.group(1)
                );

            } catch (Exception e) {

                return null;
            }
        }

        return null;
    }


    // ==========================================
    // HELPER METHOD
    // ==========================================

    private boolean containsAny(
            String text,
            String... keywords
    ) {

        for (String keyword : keywords) {

            if (text.contains(
                    keyword.toLowerCase()
            )) {

                return true;
            }
        }

        return false;
    }
}
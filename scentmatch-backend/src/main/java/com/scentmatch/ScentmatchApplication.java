package com.scentmatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ScentmatchApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                ScentmatchApplication.class,
                args
        );

        // Check whether Gemini API key is available
        boolean geminiKeyConfigured =
                System.getenv("GEMINI_API_KEY") != null
                && !System.getenv("GEMINI_API_KEY").isBlank();

        System.out.println(
                "Gemini API Key configured: "
                + geminiKeyConfigured
        );
    }
}
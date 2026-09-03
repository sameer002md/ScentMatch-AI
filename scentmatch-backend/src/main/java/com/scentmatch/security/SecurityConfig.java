package com.scentmatch.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // ==========================================
    // JWT AUTHENTICATION FILTER
    // ==========================================

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


    // ==========================================
    // PASSWORD ENCODER
    // ==========================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    // ==========================================
    // SECURITY FILTER CHAIN
    // ==========================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // =====================================
                // ENABLE CORS
                // =====================================

                .cors(cors -> {})


                // =====================================
                // DISABLE CSRF
                // =====================================

                .csrf(csrf -> csrf.disable())


                // =====================================
                // STATELESS SESSION
                // =====================================

                .sessionManagement(
                        session -> session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // =====================================
                // AUTHORIZATION RULES
                // =====================================

                .authorizeHttpRequests(
                        auth -> auth


                                // =========================
                                // ALLOW PREFLIGHT REQUESTS
                                // =========================

                                .requestMatchers(
                                        HttpMethod.OPTIONS,
                                        "/**"
                                )
                                .permitAll()


                                // =========================
                                // AUTHENTICATION APIs
                                // =========================

                                .requestMatchers(
                                        "/api/auth/**"
                                )
                                .permitAll()


                                // =========================
                                // PUBLIC PERFUME APIs
                                // =========================

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/perfumes/**"
                                )
                                .permitAll()


                                // =========================
                                // QUIZ RECOMMENDATIONS
                                // =========================

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/recommendations"
                                )
                                .permitAll()


                                // =========================
                                // AI SCENT ASSISTANT
                                // IMPORTANT:
                                // FRONTEND CALLS:
                                // /api/ai/recommend
                                // =========================

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/ai/recommend"
                                )
                                .permitAll()


                                // =========================
                                // ADMIN DASHBOARD
                                // =========================

                                .requestMatchers(
                                        "/api/admin/**"
                                )
                                .hasRole("ADMIN")


                                // =========================
                                // ADMIN CREATE PERFUME
                                // =========================

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/perfumes"
                                )
                                .hasRole("ADMIN")


                                // =========================
                                // ADMIN UPDATE PERFUME
                                // =========================

                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/perfumes/**"
                                )
                                .hasRole("ADMIN")


                                // =========================
                                // ADMIN DELETE PERFUME
                                // =========================

                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/perfumes/**"
                                )
                                .hasRole("ADMIN")


                                // =========================
                                // EVERYTHING ELSE
                                // =========================

                                .anyRequest()
                                .authenticated()
                )


                // =====================================
                // ADD JWT FILTER
                // =====================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();

    }


    // ==========================================
    // CORS CONFIGURATION
    // ==========================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // =====================================
        // REACT FRONTEND
        // =====================================

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );


        // =====================================
        // ALLOWED METHODS
        // =====================================

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );


        // =====================================
        // ALLOWED HEADERS
        // =====================================

        configuration.setAllowedHeaders(
                List.of("*")
        );


        // =====================================
        // EXPOSE HEADERS
        // =====================================

        configuration.setExposedHeaders(
                List.of(
                        "Authorization"
                )
        );


        // =====================================
        // CREDENTIALS
        // =====================================

        configuration.setAllowCredentials(true);


        // =====================================
        // REGISTER CONFIGURATION
        // =====================================

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;

    }

}
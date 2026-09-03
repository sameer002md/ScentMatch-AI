package com.scentmatch.repository;

import com.scentmatch.entity.AIExplanation;
import com.scentmatch.entity.Perfume;
import com.scentmatch.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AIExplanationRepository
        extends JpaRepository<AIExplanation, Long> {

    Optional<AIExplanation> findByUserAndPerfume(
            User user,
            Perfume perfume
    );
}
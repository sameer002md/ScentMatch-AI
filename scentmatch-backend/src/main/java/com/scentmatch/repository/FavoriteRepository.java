package com.scentmatch.repository;

import com.scentmatch.entity.Favorite;
import com.scentmatch.entity.User;
import com.scentmatch.entity.Perfume;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository
        extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserAndPerfume(
            User user,
            Perfume perfume
    );

    List<Favorite> findByUser(User user);

    boolean existsByUserAndPerfume(
            User user,
            Perfume perfume
    );
}
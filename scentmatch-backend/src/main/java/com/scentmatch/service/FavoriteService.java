package com.scentmatch.service;

import com.scentmatch.entity.Favorite;
import com.scentmatch.entity.Perfume;
import com.scentmatch.entity.User;
import com.scentmatch.repository.FavoriteRepository;
import com.scentmatch.repository.PerfumeRepository;
import com.scentmatch.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final PerfumeRepository perfumeRepository;

    public FavoriteService(
            FavoriteRepository favoriteRepository,
            UserRepository userRepository,
            PerfumeRepository perfumeRepository) {

        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.perfumeRepository = perfumeRepository;
    }

    public Favorite addFavorite(
            String email,
            Long perfumeId) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Perfume perfume = perfumeRepository
                .findById(perfumeId)
                .orElseThrow(() ->
                        new RuntimeException("Perfume not found"));

        if (favoriteRepository
                .existsByUserAndPerfume(user, perfume)) {

            throw new RuntimeException(
                    "Perfume already added to favorites"
            );
        }

        Favorite favorite = new Favorite();

        favorite.setUser(user);
        favorite.setPerfume(perfume);

        return favoriteRepository.save(favorite);
    }

    public List<Favorite> getMyFavorites(
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return favoriteRepository.findByUser(user);
    }

    public void removeFavorite(
            String email,
            Long perfumeId) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Perfume perfume = perfumeRepository
                .findById(perfumeId)
                .orElseThrow(() ->
                        new RuntimeException("Perfume not found"));

        Favorite favorite =
                favoriteRepository
                    .findByUserAndPerfume(user, perfume)
                    .orElseThrow(() ->
                        new RuntimeException(
                            "Favorite not found"
                        ));

        favoriteRepository.delete(favorite);
    }
}
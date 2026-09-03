package com.scentmatch.controller;

import com.scentmatch.entity.Favorite;
import com.scentmatch.service.FavoriteService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(
            FavoriteService favoriteService) {

        this.favoriteService = favoriteService;
    }

    @PostMapping("/{perfumeId}")
    public ResponseEntity<Favorite> addFavorite(
            @PathVariable Long perfumeId,
            Authentication authentication) {

        String email = authentication.getName();

        Favorite favorite =
                favoriteService.addFavorite(
                        email,
                        perfumeId
                );

        return ResponseEntity.ok(favorite);
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getMyFavorites(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                favoriteService.getMyFavorites(email)
        );
    }

    @DeleteMapping("/{perfumeId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long perfumeId,
            Authentication authentication) {

        String email = authentication.getName();

        favoriteService.removeFavorite(
                email,
                perfumeId
        );

        return ResponseEntity.noContent().build();
    }
}
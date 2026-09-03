package com.scentmatch.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.scentmatch.dto.AuthResponse;
import com.scentmatch.dto.LoginRequest;
import com.scentmatch.dto.RegisterRequest;
import com.scentmatch.entity.User;
import com.scentmatch.repository.UserRepository;
import com.scentmatch.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;


    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;

    }


    // =========================
    // REGISTER
    // =========================

    public AuthResponse register(
            RegisterRequest request
    ) {

        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new RuntimeException(
                    "Email is already registered"
            );

        }


        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(

                passwordEncoder.encode(
                        request.getPassword()
                )

        );


        // =========================
        // DEFAULT ROLE
        // =========================

        user.setRole("USER");


        User savedUser =
                userRepository.save(user);


        String token =

                jwtUtil.generateToken(
                        savedUser.getEmail()
                );


        return new AuthResponse(

                token,

                savedUser.getId(),

                savedUser.getName(),

                savedUser.getEmail(),

                savedUser.getRole()

        );

    }


    // =========================
    // LOGIN
    // =========================

    public AuthResponse login(
            LoginRequest request
    ) {


        User user =

                userRepository
                        .findByEmail(
                                request.getEmail()
                        )

                        .orElseThrow(() ->

                                new RuntimeException(
                                        "Invalid email or password"
                                )

                        );


        boolean passwordMatches =

                passwordEncoder.matches(

                        request.getPassword(),

                        user.getPassword()

                );


        if (!passwordMatches) {

            throw new RuntimeException(

                    "Invalid email or password"

            );

        }


        String token =

                jwtUtil.generateToken(

                        user.getEmail()

                );


        return new AuthResponse(

                token,

                user.getId(),

                user.getName(),

                user.getEmail(),

                user.getRole()

        );

    }

}
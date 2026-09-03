package com.scentmatch.service;

import com.scentmatch.entity.User;
import com.scentmatch.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository
    ) {

        this.userRepository =
                userRepository;
    }

    public User createUser(User user) {

        if (userRepository.existsByEmail(
                user.getEmail()
        )) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public Optional<User> getUserById(
            Long id
    ) {

        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(
            String email
    ) {

        return userRepository.findByEmail(email);
    }

    public User getUserByEmailOrThrow(
            String email
    ) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }

    public void deleteUser(
            Long id
    ) {

        userRepository.deleteById(id);
    }
}
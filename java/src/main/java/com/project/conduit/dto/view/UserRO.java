package com.project.conduit.dto.view;

import com.project.conduit.model.User;

public record UserRO(
        String username,
        String email,
        String bio,
        String image,
        String token) {
    public UserRO(User user, String token) {
        this(user.getUsername(), user.getEmail(), user.getBio(), user.getImage(), token);
    }

    public UserRO(User user) {
        this(user.getUsername(), user.getEmail(), user.getBio(), user.getImage(), null);
    }
}

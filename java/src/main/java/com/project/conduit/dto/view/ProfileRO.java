package com.project.conduit.dto.view;

public record ProfileRO(ProfileDetails profile) {
    public record ProfileDetails(
            String username,
            String bio,
            String image,
            boolean following) {
    }
}

package com.project.conduit.dto.view;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleRO(
        ArticleDetails article) {
    public static record ArticleDetails(
            String slug,
            String title,
            String description,
            String body,
            List<String> tagList,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            boolean favorited,
            int favoritesCount,
            AuthorDetails author) {
    }

    public static record AuthorDetails(
            String username,
            String bio,
            String image,
            boolean following) {
    }
}
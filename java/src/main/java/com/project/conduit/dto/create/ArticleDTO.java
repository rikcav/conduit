package com.project.conduit.dto.create;

import java.util.List;

public record ArticleDTO(
        String slug,
        String title,
        String description,
        String body,
        List<String> tagList,
        boolean favorited,
        int favoritesCount,
        Long authorId) {
}

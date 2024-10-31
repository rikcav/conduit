package com.project.conduit.dto.view;

import java.time.LocalDateTime;

public record CommentRO(
        CommentDetails comment
) {
    public record CommentDetails(
            Long id,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            String body,
            AuthorDetails author
    ) {
    }

    public record AuthorDetails(
            String username,
            String bio,
            String image,
            boolean following
    ) {
    }
}

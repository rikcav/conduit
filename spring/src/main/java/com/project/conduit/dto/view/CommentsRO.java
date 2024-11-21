package com.project.conduit.dto.view;

import java.util.List;

public record CommentsRO(
        List<CommentRO.CommentDetails> comments) {
}

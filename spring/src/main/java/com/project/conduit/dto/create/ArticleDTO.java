package com.project.conduit.dto.create;

import java.util.List;

public record ArticleDTO(String title, String description, String body, List<String> tagList, Long authorId) {
}

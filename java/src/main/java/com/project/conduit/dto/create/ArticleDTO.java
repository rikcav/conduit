package com.project.conduit.dto.create;

import java.util.List;

public record ArticleDTO(ArticleData article) {
    public record ArticleData(String title, String description, String body, List<String> tagList) {
    }
}

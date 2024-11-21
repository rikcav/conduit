package com.project.conduit.dto.view;

import java.util.List;

public record ArticlesRO(
        List<ArticleRO.ArticleDetails> articles,
        int articlesCount) {
}

package com.project.conduit.service;

import com.project.conduit.model.Article;
import com.project.conduit.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article findBySlug(String slug) {
        return articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));
    }

    public Article updateArticle(String slug, Article article) {
        var savedArticle = articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));

        savedArticle.setId(article.getId());
        savedArticle.setSlug(slug);
        savedArticle.setTitle(article.getTitle());
        savedArticle.setDescription(article.getDescription());
        savedArticle.setBody(article.getBody());
        savedArticle.setUpdatedAt(LocalDateTime.now());
        savedArticle.setFavorited(article.isFavorited());
        savedArticle.setFavoritesCount(article.getFavoritesCount());

        return articleRepository.save(savedArticle);
    }

    public void deleteArticle(String slug) {
        var savedArticle = articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));
        articleRepository.delete(savedArticle);
    }
}

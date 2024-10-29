package com.project.conduit.service;

import com.project.conduit.dto.create.ArticleDTO;
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

    public Article createArticle(ArticleDTO articleDTO) {
        var article = dtoToEntity(articleDTO);
        return articleRepository.save(article);
    }

    public Article findBySlug(String slug) {
        return articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));
    }

    public Article updateArticle(String slug, ArticleDTO articleDTO) {
        var savedArticle = articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));

        var updatedArticle = dtoToEntity(articleDTO);
        updatedArticle.setId(savedArticle.getId());

        return articleRepository.save(updatedArticle);
    }

    public void deleteArticle(String slug) {
        var savedArticle = articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));
        articleRepository.delete(savedArticle);
    }

    private Article dtoToEntity(ArticleDTO articleDTO) {
        var article = new Article();

        article.setSlug(article.getSlug());
        article.setTitle(article.getTitle());
        article.setDescription(article.getDescription());
        article.setBody(article.getBody());
        article.setUpdatedAt(LocalDateTime.now());
        article.setFavorited(article.isFavorited());
        article.setFavoritesCount(article.getFavoritesCount());

        return article;
    }
}

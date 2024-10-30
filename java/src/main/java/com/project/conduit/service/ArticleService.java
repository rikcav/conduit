package com.project.conduit.service;

import com.project.conduit.dto.create.ArticleDTO;
import com.project.conduit.model.Article;
import com.project.conduit.repository.ArticleRepository;
import com.project.conduit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public Article createArticle(ArticleDTO articleDTO) {
        var article = dtoToEntity(articleDTO);
        return articleRepository.save(article);
    }

    public List<Article> findAll() {
        return articleRepository.findAll();
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
        var author = userRepository.findById(articleDTO.authorId()).orElseThrow(() -> new RuntimeException("User not found"));
        var article = new Article();

        article.setSlug(articleDTO.slug());
        article.setTitle(articleDTO.title());
        article.setDescription(articleDTO.description());
        article.setBody(articleDTO.body());
        article.setUpdatedAt(LocalDateTime.now());
        article.setFavorited(articleDTO.favorited());
        article.setFavoritesCount(articleDTO.favoritesCount());
        article.setAuthor(author);

        return article;
    }
}

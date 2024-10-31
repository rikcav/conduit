package com.project.conduit.service;

import com.project.conduit.dto.create.ArticleDTO;
import com.project.conduit.dto.view.ArticleRO;
import com.project.conduit.dto.view.ArticlesRO;
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

    public ArticleRO createArticle(ArticleDTO articleDTO) {
        var article = dtoToEntity(articleDTO);
        var savedArticle = articleRepository.save(article);

        return entityToRo(savedArticle);
    }

    public ArticlesRO findAll() {
        var articles = articleRepository.findAll();

        return entitiesToRo(articles);
    }

    public ArticleRO findBySlug(String slug) {
        var article = articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));
        return entityToRo(article);
    }

    public ArticleRO updateArticle(String slug, ArticleDTO articleDTO) {
        var savedArticle = articleRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Article not found"));

        var updatedArticle = dtoToEntity(articleDTO);
        updatedArticle.setId(savedArticle.getId());

        var article = articleRepository.save(updatedArticle);

        return entityToRo(article);
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

    private ArticleRO entityToRo(Article article) {
        ArticleRO.AuthorDetails authorDetails = new ArticleRO.AuthorDetails(
                article.getAuthor().getUsername(),
                article.getAuthor().getBio(),
                article.getAuthor().getImage(),
                false
        );

        ArticleRO.ArticleDetails articleDetails = new ArticleRO.ArticleDetails(
                article.getSlug(),
                article.getTitle(),
                article.getDescription(),
                article.getBody(),
                article.getTagList(),
                article.getCreatedAt(),
                article.getUpdatedAt(),
                false,
                article.getFavoritesCount(),
                authorDetails
        );

        return new ArticleRO(articleDetails);
    }

    private ArticlesRO entitiesToRo(List<Article> articles) {
        List<ArticleRO.ArticleDetails> articleDetailsList = articles.stream()
                .map(article -> {
                    ArticleRO.AuthorDetails authorDetails = new ArticleRO.AuthorDetails(
                            article.getAuthor().getUsername(),
                            article.getAuthor().getBio(),
                            article.getAuthor().getImage(),
                            false
                    );

                    return new ArticleRO.ArticleDetails(
                            article.getSlug(),
                            article.getTitle(),
                            article.getDescription(),
                            article.getBody(),
                            article.getTagList(),
                            article.getCreatedAt(),
                            article.getUpdatedAt(),
                            false,
                            article.getFavoritesCount(),
                            authorDetails
                    );
                }).toList();

        return new ArticlesRO(articleDetailsList, articleDetailsList.size());
    }
}

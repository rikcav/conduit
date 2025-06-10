package com.project.conduit.service;

import com.project.conduit.dto.create.ArticleDTO;
import com.project.conduit.exception.ResourceNotFoundException;
import com.project.conduit.model.Article;
import com.project.conduit.model.Tag;
import com.project.conduit.repository.ArticleRepository;
import com.project.conduit.repository.TagRepository;
import com.project.conduit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public Article createArticle(ArticleDTO articleDTO) {
        var article = dtoToEntity(articleDTO);

        var author = article.getAuthor();
        article.setAuthor(author);

        getOrCreateTags(articleDTO.tagList());
        article.setTagList(normalizeTagNames(articleDTO.tagList()));

        return articleRepository.save(article);
    }

    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    public Article findBySlug(String slug) {
        return articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
    }

    public Article updateArticle(String slug, ArticleDTO articleDTO) {
        var savedArticle = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));

        var updatedArticle = dtoToEntity(articleDTO);
        updatedArticle.setId(savedArticle.getId());
        updatedArticle.setAuthor(savedArticle.getAuthor());

        getOrCreateTags(articleDTO.tagList());
        updatedArticle.setTagList(normalizeTagNames(articleDTO.tagList()));

        return articleRepository.save(updatedArticle);
    }

    public void deleteArticle(String slug) {
        var savedArticle = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
        articleRepository.delete(savedArticle);
    }

    public Article favoriteArticle(String slug) {
        var article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));

        article.setFavorited(true);
        article.setFavoritesCount(article.getFavoritesCount() + 1);

        return articleRepository.save(article);
    }

    public Article unFavoriteArticle(String slug) {
        var article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));

        int newCount = Math.max(0, article.getFavoritesCount() - 1);

        article.setFavoritesCount(newCount);
        article.setFavorited(newCount > 0);

        return articleRepository.save(article);
    }

    private Article dtoToEntity(ArticleDTO articleDTO) {
        var author = userRepository.findById(articleDTO.authorId())
                .orElseThrow(() -> new ResourceNotFoundException("Author not found"));

        var article = new Article();

        article.setSlug(titleToSlug(articleDTO.title()));
        article.setTitle(articleDTO.title());
        article.setDescription(articleDTO.description());
        article.setBody(articleDTO.body());
        article.setUpdatedAt(LocalDateTime.now());
        article.setAuthor(author);

        return article;
    }

    private String titleToSlug(String title) {
        if (title == null) {
            return "";
        }

        String normalized = Normalizer.normalize(title, Normalizer.Form.NFD);

        return normalized
                .replaceAll("[^\\p{Alnum} ]", "")
                .trim()
                .replaceAll("\\s+", "-")
                .toLowerCase();
    }

    private String normalizeTagName(String name) {
        if (name == null) return "";

        return Normalizer.normalize(name, Normalizer.Form.NFD)
                .replaceAll("[^\\p{Alnum} ]", "")
                .trim()
                .replaceAll("\\s+", "-")
                .toLowerCase();
    }

    private Tag createTag(String name) {
        Tag tag = new Tag();

        var tagName = normalizeTagName(name);

        tag.setName(tagName);

        return tagRepository.save(tag);
    }

    private Tag findOrCreateTagByName(String name) {
        String normalized = normalizeTagName(name);
        return tagRepository.findByName(normalized)
                .orElseGet(() -> createTag(normalized));
    }

    private List<Tag> getOrCreateTags(List<String> tagNames) {
        return tagNames.stream()
                .map(this::findOrCreateTagByName)
                .toList();
    }

    private List<String> normalizeTagNames(List<String> tagNames) {
        return tagNames.stream()
                .map(this::normalizeTagName)
                .toList();
    }
}

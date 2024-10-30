package com.project.conduit.controller;

import com.project.conduit.dto.create.ArticleDTO;
import com.project.conduit.model.Article;
import com.project.conduit.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody ArticleDTO articleDTO) {
        var articleCreated = articleService.createArticle(articleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(articleCreated);
    }

    @GetMapping
    public ResponseEntity<List<Article>> findAll() {
        var articles = articleService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(articles);
    }

    @GetMapping("{slug}")
    public ResponseEntity<Article> findBySlug(@PathVariable String slug) {
        var articleFound = articleService.findBySlug(slug);
        return ResponseEntity.status(HttpStatus.OK).body(articleFound);
    }

    @PutMapping("{slug}")
    public ResponseEntity<Article> updateArticle(@PathVariable String slug, @RequestBody ArticleDTO articleDTO) {
        var articleUpdated = articleService.updateArticle(slug, articleDTO);
        return ResponseEntity.status(HttpStatus.OK).body(articleUpdated);
    }

    @DeleteMapping("{slug}")
    public ResponseEntity<Article> deleteArticle(@PathVariable String slug) {
        articleService.deleteArticle(slug);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

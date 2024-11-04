package com.project.conduit.controller;

import com.project.conduit.dto.create.ArticleDTO;
import com.project.conduit.dto.view.ArticleRO;
import com.project.conduit.dto.view.ArticlesRO;
import com.project.conduit.service.ArticleService;
import com.project.conduit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    private final ArticleService articleService;
    private final UserService userService;

    @Autowired
    public ArticleController(ArticleService articleService, UserService userService) {
        this.articleService = articleService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ArticleRO> createArticle(@RequestBody ArticleDTO articleDTO) {
        var articleCreated = articleService.createArticle(articleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(articleCreated);
    }

    @GetMapping
    public ResponseEntity<ArticlesRO> findAll(@RequestParam Optional<Integer> limit, @RequestParam Optional<Integer> offset) {
        var articles = articleService.findAll(limit.orElse(20), offset.orElse(0));
        return ResponseEntity.status(HttpStatus.OK).body(articles);
    }

    @GetMapping("{slug}")
    public ResponseEntity<ArticleRO> findBySlug(@PathVariable String slug) {
        var articleFound = articleService.findBySlug(slug);
        return ResponseEntity.status(HttpStatus.OK).body(articleFound);
    }

    @PutMapping("{slug}")
    public ResponseEntity<ArticleRO> updateArticle(@PathVariable String slug, @RequestBody ArticleDTO articleDTO) {
        var articleUpdated = articleService.updateArticle(slug, articleDTO);
        return ResponseEntity.status(HttpStatus.OK).body(articleUpdated);
    }

    @DeleteMapping("{slug}")
    public ResponseEntity<Void> deleteArticle(@PathVariable String slug) {
        articleService.deleteArticle(slug);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("{slug}/favorite")
    public ResponseEntity<ArticleRO> favoriteArticle(@PathVariable String slug) {
        var user = userService.findByUsername("henrique");
        var favoritedArticle = articleService.favoriteArticle(slug, user);
        return ResponseEntity.status(HttpStatus.OK).body(favoritedArticle);
    }

    @DeleteMapping("{slug}/favorite")
    public ResponseEntity<ArticleRO> unfavoriteArticle(@PathVariable String slug) {
        var user = userService.findByUsername("henrique");
        var unfavoritedArticle = articleService.unFavoriteArticle(slug, user);
        return ResponseEntity.status(HttpStatus.OK).body(unfavoritedArticle);
    }
}

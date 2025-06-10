package com.project.conduit.controller;

import com.project.conduit.dto.create.CommentDTO;
import com.project.conduit.dto.view.CommentRO;
import com.project.conduit.dto.view.CommentsRO;
import com.project.conduit.model.Comment;
import com.project.conduit.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles/{slug}/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(@PathVariable String slug, @RequestBody CommentDTO commentDTO) {
        var commentRO = commentService.addCommentToArticle(slug, commentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentRO);
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getCommentsForArticle(@PathVariable String slug) {
        var comments = commentService.getCommentsByArticleSlug(slug);
        return ResponseEntity.status(HttpStatus.OK).body(comments);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String slug, @PathVariable Long commentId) {
        commentService.deleteComment(slug, commentId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

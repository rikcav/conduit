package com.project.conduit.service;

import com.project.conduit.dto.create.CommentDTO;
import com.project.conduit.dto.view.CommentRO;
import com.project.conduit.dto.view.CommentsRO;
import com.project.conduit.exception.ResourceNotFoundException;
import com.project.conduit.model.Comment;
import com.project.conduit.repository.ArticleRepository;
import com.project.conduit.repository.CommentRepository;
import com.project.conduit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserRepository userRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    public List<Comment> getCommentsByArticleSlug(String slug) {
        var article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));

        var comments = commentRepository.findAllByArticleId(article.getId());

        return new ArrayList<>(comments);
    }

    public Comment addCommentToArticle(String slug, CommentDTO commentDTO) {
        var article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));

        var comment = dtoToEntity(commentDTO);
        comment.setArticle(article);

        return commentRepository.save(comment);
    }

    public void deleteComment(String slug, Long commentId) {
        articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
        var comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        commentRepository.delete(comment);
    }

    private Comment dtoToEntity(CommentDTO commentDTO) {
        var author = userRepository.findById(commentDTO.authorId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Comment comment = new Comment();

        comment.setBody(commentDTO.body());
        comment.setAuthor(author);

        return comment;
    }
}

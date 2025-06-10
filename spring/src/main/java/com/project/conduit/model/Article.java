package com.project.conduit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String body;

    @ElementCollection
    private List<String> tagList;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(nullable = false)
    private int favoritesCount = getFavoritesCount();

    @Column(nullable = false)
    private boolean favorited = false;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

}

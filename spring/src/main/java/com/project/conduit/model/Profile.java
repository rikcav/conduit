package com.project.conduit.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    private User user;

    private String bio;
    private String image;

    @Column(nullable = false)
    private boolean following = false;
}

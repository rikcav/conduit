package com.project.conduit.controller;

import com.project.conduit.dto.view.TagsRO;
import com.project.conduit.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<TagsRO> findAll() {
        TagsRO tags = tagService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(tags);
    }
}

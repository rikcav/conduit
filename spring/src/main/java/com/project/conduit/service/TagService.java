package com.project.conduit.service;

import com.project.conduit.dto.view.TagsRO;
import com.project.conduit.model.Tag;
import com.project.conduit.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    private final TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public TagsRO findAll() {
        List<Tag> tags = tagRepository.findAll();
        return entitiesToRO(tags);
    }

    private TagsRO entitiesToRO(List<Tag> tags) {
        List<String> tagNames = tags.stream()
                .map(Tag::getName)
                .toList();
        return new TagsRO(tagNames);
    }
}
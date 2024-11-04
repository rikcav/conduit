package com.project.conduit.service;

import com.project.conduit.dto.view.TagsRO;
import com.project.conduit.model.Tag;
import com.project.conduit.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public TagsRO getAllTags() {
        List<String> tags = tagRepository.findAll().stream()
                .map(Tag::getName)
                .collect(Collectors.toList());
        return new TagsRO(tags);
    }
}

package com.project.conduit.service;

import com.project.conduit.exception.ResourceNotFoundException;
import com.project.conduit.model.User;
import com.project.conduit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }
}

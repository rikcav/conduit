package com.project.conduit.service;

import com.project.conduit.dto.create.UserDTO;
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

    public User registerUser(UserDTO userDTO) {
        var user = dtoToEntity(userDTO);
        return userRepository.save(user);
    }

    private User dtoToEntity(UserDTO userDTO) {
        User user = new User();

        user.setUsername(userDTO.user().username());
        user.setEmail(userDTO.user().email());
        user.setPassword(userDTO.user().password());

        return user;
    }
}

package com.project.conduit.service;

import com.project.conduit.dto.create.UserDTO;
import com.project.conduit.exception.DuplicateResourceException;
import com.project.conduit.exception.ResourceNotFoundException;
import com.project.conduit.model.User;
import com.project.conduit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User registerUser(UserDTO userDTO) {
        var user = dtoToEntity(userDTO);
        try {
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateResourceException("Username or email already exists");
        }
    }

    public User updateUser(Long id, UserDTO userDTO) {
        Optional<User> optionalOldUser = userRepository.findById(id);

        if (optionalOldUser.isEmpty()) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }

        User oldUser = optionalOldUser.get();
        User newUser = dtoToEntity(userDTO);

        oldUser.setUsername(newUser.getUsername());
        oldUser.setEmail(newUser.getEmail());
        oldUser.setPassword(newUser.getPassword());

        try {
            return userRepository.save(oldUser);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateResourceException("Username or email already exists");
        }
    }

    private User dtoToEntity(UserDTO userDTO) {
        User user = new User();

        user.setUsername(userDTO.username());
        user.setEmail(userDTO.email());
        user.setPassword(userDTO.password());

        return user;
    }
}

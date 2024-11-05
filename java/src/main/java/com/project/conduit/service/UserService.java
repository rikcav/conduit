package com.project.conduit.service;

import com.project.conduit.dto.create.LoginDTO;
import com.project.conduit.dto.create.UserDTO;
import com.project.conduit.dto.view.UserRO;
import com.project.conduit.exception.ResourceNotFoundException;
import com.project.conduit.model.User;
import com.project.conduit.repository.UserRepository;
import com.project.conduit.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User registerUser(UserDTO userDTO) {
        var user = dtoToEntity(userDTO);
        return userRepository.save(user);
    }

    public UserRO loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.user().email())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid username or password"));

        String token = jwtUtil.generateToken(user.getUsername());

        return entityToRO(user, token);
    }

    public UserRO updateUser(String token, UserDTO userDTO) {
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setUsername(userDTO.user().username());
        user.setEmail(userDTO.user().email());

        User updatedUser = userRepository.save(user);

        return entityToRO(updatedUser, username);
    }

    private User dtoToEntity(UserDTO userDTO) {
        User user = new User();

        user.setUsername(userDTO.user().username());
        user.setEmail(userDTO.user().email());
        user.setPassword(userDTO.user().password());

        return user;
    }

    private UserRO entityToRO(User user) {
        return new UserRO(user);
    }

    private UserRO entityToRO(User user, String token) {
        return new UserRO(user, token);
    }
}

package com.project.conduit.service;

import com.project.conduit.dto.create.UserDTO;
import com.project.conduit.exception.ResourceNotFoundException;
import com.project.conduit.model.Profile;
import com.project.conduit.model.User;
import com.project.conduit.repository.ProfileRepository;
import com.project.conduit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    @Autowired
    public UserService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User registerUser(UserDTO userDTO) {
        var user = dtoToEntity(userDTO);

        var profile = userToProfile(user);

        var savedUser = userRepository.save(user);
        profileRepository.save(profile);

        return savedUser;
    }

    private User dtoToEntity(UserDTO userDTO) {
        User user = new User();

        user.setUsername(userDTO.user().username());
        user.setEmail(userDTO.user().email());
        user.setPassword(userDTO.user().password());

        return user;
    }

    private Profile userToProfile(User user) {
        Profile profile = new Profile();

        profile.setImage(user.getImage());
        profile.setBio(user.getBio());
        profile.setUser(user);

        return profile;
    }
}

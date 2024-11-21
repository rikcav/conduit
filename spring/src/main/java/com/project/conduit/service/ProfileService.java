package com.project.conduit.service;

import com.project.conduit.dto.view.ProfileRO;
import com.project.conduit.exception.ResourceNotFoundException;
import com.project.conduit.model.Profile;
import com.project.conduit.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileRO getProfile(String username) {
        var profile = profileRepository.findByUser_Username(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return entityToRO(profile);
    }

    public ProfileRO followProfile(String username) {
        var profileToFollow = profileRepository.findByUser_Username(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        profileToFollow.setFollowing(true);

        var followedProfile = profileRepository.save(profileToFollow);

        return entityToRO(followedProfile);
    }

    public ProfileRO unfollowProfile(String username) {
        var profileToFollow = profileRepository.findByUser_Username(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        profileToFollow.setFollowing(false);

        var unfollowedProfile = profileRepository.save(profileToFollow);

        return entityToRO(unfollowedProfile);
    }

    private ProfileRO entityToRO(Profile profile) {
        return new ProfileRO(new ProfileRO.ProfileDetails(
                profile.getUser().getUsername(),
                profile.getBio(),
                profile.getImage(),
                profile.isFollowing()
        ));
    }
}

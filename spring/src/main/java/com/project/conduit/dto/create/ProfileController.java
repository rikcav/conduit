package com.project.conduit.dto.create;

import com.project.conduit.dto.view.ProfileRO;
import com.project.conduit.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<ProfileRO> getProfile(@PathVariable String username) {
        var profile = profileService.getProfile(username);
        return ResponseEntity.status(HttpStatus.OK).body(profile);
    }

    @PostMapping("/{username}/follow")
    public ResponseEntity<ProfileRO> followUser(@PathVariable String username) {
        var profile = profileService.followProfile(username);
        return ResponseEntity.status(HttpStatus.OK).body(profile);
    }

    @DeleteMapping("/{username}/follow")
    public ResponseEntity<ProfileRO> unfollowUser(@PathVariable String username) {
        var profile = profileService.unfollowProfile(username);
        return ResponseEntity.status(HttpStatus.OK).body(profile);
    }
}

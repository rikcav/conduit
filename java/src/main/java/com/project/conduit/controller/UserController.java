package com.project.conduit.controller;

import com.project.conduit.dto.create.UserDTO;
import com.project.conduit.model.User;
import com.project.conduit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public ResponseEntity<User> registerUser(@RequestBody UserDTO userDTO) {
        var savedUser = userService.registerUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {
        var user = userService.findByUsername(username);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}

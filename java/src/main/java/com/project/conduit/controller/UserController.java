package com.project.conduit.controller;

import com.project.conduit.dto.create.LoginDTO;
import com.project.conduit.dto.create.UserDTO;
import com.project.conduit.dto.view.UserRO;
import com.project.conduit.model.User;
import com.project.conduit.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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

    @PostMapping("/users/login")
    public ResponseEntity<UserRO> loginUser(@RequestBody LoginDTO loginDTO) {
        var user = userService.loginUser(loginDTO);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser() {
        var user = userService.findByUsername("henrique");
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PutMapping("/user")
    public ResponseEntity<UserRO> updateCurrentUser(@RequestBody UserDTO userDTO, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        UserRO updatedUser = userService.updateUser(token, userDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }
}

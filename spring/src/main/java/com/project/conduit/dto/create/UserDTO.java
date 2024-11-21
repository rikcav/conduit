package com.project.conduit.dto.create;

public record UserDTO(UserData user) {
    public record UserData(String username, String email, String password) {
    }
}

package com.project.conduit.dto.create;

public record LoginDTO(LoginData user) {
    public record LoginData(String email, String password) {
    }
}

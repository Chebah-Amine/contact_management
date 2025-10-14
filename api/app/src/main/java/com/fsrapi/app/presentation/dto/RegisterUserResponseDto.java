package com.fsrapi.app.presentation.dto;

import java.time.Instant;

import com.fsrapi.app.domain.entity.User;

public class RegisterUserResponseDto {
    private String id;
    private String login;
    private Instant createdAt;

    public RegisterUserResponseDto() {
    }

    private RegisterUserResponseDto(String id, String login, Instant createdAt) {
        this.id = id;
        this.login = login;
        this.createdAt = createdAt;
    }

    public static RegisterUserResponseDto from(User user) {
        return new RegisterUserResponseDto(
                user.getId(),
                user.getLogin(),
                user.getCreatedAt());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

}

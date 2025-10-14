package com.fsrapi.app.domain.entity;

import java.time.Instant;
import java.util.UUID;

public class User {
    private final String id;
    private final String login;
    private final String encodedPassword;
    private final Instant createdAt;

    // private constructor to force the use of the factory method
    private User(String id, String login, String encodedPassword, Instant createdAt) {
        this.id = id;
        this.login = login;
        this.encodedPassword = encodedPassword;
        this.createdAt = createdAt;
    }

    public static User create(String login, String encodedPassword) {
        validateLogin(login);
        validatePassword(encodedPassword);

        return new User(
                UUID.randomUUID().toString(),
                login,
                encodedPassword,
                Instant.now());
    }

    // reconstitute user from db
    public static User reconstitute(String id, String login, String encodedPassword, Instant createdAt) {
        return new User(id, login, encodedPassword, createdAt);
    }

    private static void validateLogin(String login) {
        if (login == null || login.trim().isEmpty()) {
            throw new IllegalArgumentException("Login cannot be null or empty");
        }
        if (login.length() < 3 || login.length() > 50) {
            throw new IllegalArgumentException("Login must be between 3 and 50 characters");
        }
    }

    private static void validatePassword(String encodedPassword) {
        if (encodedPassword == null || encodedPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Encoded Password cannot be null or empty");
        }
    }

    public String getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

}

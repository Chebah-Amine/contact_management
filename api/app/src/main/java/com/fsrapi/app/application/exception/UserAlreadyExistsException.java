package com.fsrapi.app.application.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String login) {
        super(String.format("User with login '%s' already exists", login));
    }
}

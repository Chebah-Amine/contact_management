package com.fsrapi.app.domain.usecase;

import com.fsrapi.app.application.exception.UserAlreadyExistsException;
import com.fsrapi.app.domain.entity.User;

public interface RegisterUserUseCase {
    /**
     * Save the new user
     * @param login user login
     * @param password user password (not encoded)
     * @return created user
     * @throws UserAlreadyExistsException if the login already exists
     * @throws IllegalArgumentException
     */
    User register(String login, String password);
}

package com.fsrapi.app.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fsrapi.app.application.exception.UserAlreadyExistsException;
import com.fsrapi.app.domain.entity.User;
import com.fsrapi.app.domain.repository.UserRepository;
import com.fsrapi.app.domain.service.PasswordEncoder;
import com.fsrapi.app.domain.usecase.RegisterUserUseCase;

@Service
@Transactional
public class RegisterUserService implements RegisterUserUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterUserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(String login, String password) {

        if (userRepository.existsByLogin(login)) {
            throw new UserAlreadyExistsException(login);
        }

        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        User user = User.create(login, passwordEncoder.encode(password));

        return userRepository.save(user);
    }
}

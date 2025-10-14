package com.fsrapi.app.domain.repository;

import java.util.Optional;

import com.fsrapi.app.domain.entity.User;

public interface UserRepository {
    User save(User user);

    boolean existsByLogin(String login);

    Optional<User> findByLogin(String login);
}

package com.fsrapi.app.infrastructure.persistence.adapter;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.fsrapi.app.domain.entity.User;
import com.fsrapi.app.domain.repository.UserRepository;
import com.fsrapi.app.infrastructure.persistence.entity.UserJpaEntity;
import com.fsrapi.app.infrastructure.persistence.repository.UserJpaRepository;

@Component
public class UserRepositoryAdapter implements UserRepository {
    private final UserJpaRepository jpaRepository;

    public UserRepositoryAdapter(UserJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public User save(User user) {
        UserJpaEntity entity = toJpaEntity(user);
        // Transaction is managed at the repository level by Spring Data Jpa
        UserJpaEntity savedEntity = jpaRepository.save(entity);

        return toDomainEntity(savedEntity);
    }

    @Override
    public boolean existsByLogin(String login) {
        return jpaRepository.existsByLogin(login);
    }

    @Override
    public Optional<User> findByLogin(String login) {
        return jpaRepository.findByLogin(login).map(this::toDomainEntity);
    }

    private UserJpaEntity toJpaEntity(User user) {
        return new UserJpaEntity(
                user.getId(),
                user.getLogin(),
                user.getEncodedPassword(),
                user.getCreatedAt());
    }

    private User toDomainEntity(UserJpaEntity entity) {
        return User.reconstitute(
                entity.getId(),
                entity.getLogin(),
                entity.getEncodedPassword(),
                entity.getCreatedAt());
    }

}

package com.fsrapi.app.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.fsrapi.app.infrastructure.persistence.entity.UserJpaEntity;

@Repository
public interface UserJpaRepository extends JpaRepository<UserJpaEntity, String> {

    // Spring Data JPA anlyze the method and is capable to create the method
    // implementation
    // in a proxy if the method name respects the convention.
    // Otherwise we have to write the JPQL @Query above the method

    boolean existsByLogin(String login);

    Optional<UserJpaEntity> findByLogin(String login);
}

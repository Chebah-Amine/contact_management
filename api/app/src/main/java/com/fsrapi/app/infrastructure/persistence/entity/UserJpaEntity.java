package com.fsrapi.app.infrastructure.persistence.entity;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_login", columnList = "login", unique = true)
})
public class UserJpaEntity {
    @Id
    private String id;

    @Column(nullable = false, length = 50)
    private String login;

    @Column(nullable = false, name = "encoded_password")
    private String encodedPassword;

    @Column(nullable = false, name = "created_at", updatable = false)
    private Instant createdAt;

    // default constructor required by JPA
    protected UserJpaEntity() {}

    public UserJpaEntity(String id, String login, String encodedPassword, Instant createdAt) {
        this.id = id;
        this.login = login;
        this.encodedPassword = encodedPassword;
        this.createdAt = createdAt;
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

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public void setEncodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}

package com.fsrapi.app.infrastructure.security;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("BcryptPasswordEncoder - Unit Tests")
public class BcryptPasswordEncoderTest {

    private BcryptPasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        this.passwordEncoder = new BcryptPasswordEncoder();
    }

    @DisplayName("Should encode password successfully")
    @Test
    void shouldEncodePassword() {
        String rawPassword = "testPassword123!";
        String encodedPassword = this.passwordEncoder.encode(rawPassword);

        assertThat(encodedPassword).isNotNull().isNotEmpty();
        assertThat(encodedPassword).isNotEqualTo(rawPassword);
        assertThat(encodedPassword).startsWith("$2a$");
    }

    @DisplayName("Should match raw password with encoded password")
    @Test
    void shouldMatchEncodedPassword() {
        String rawPassword = "testPassword123!";
        String encodedPassword = this.passwordEncoder.encode(rawPassword);

        assertThat(this.passwordEncoder.matches(rawPassword, encodedPassword));
        assertThat(this.passwordEncoder.matches("wrongpassword", encodedPassword));
    }

    @DisplayName("Should be case sensitive")
    @Test
    void shouldBeCaseSensitive() {
        String encoded = passwordEncoder.encode("Password123");
        assertThat(passwordEncoder.matches("password123", encoded)).isFalse();
    }

}

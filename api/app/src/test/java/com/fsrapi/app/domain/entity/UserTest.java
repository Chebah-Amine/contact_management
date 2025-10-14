package com.fsrapi.app.domain.entity;

import java.time.Instant;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.*;

@DisplayName("User Entity - Unit tests")
public class UserTest {

    private final static String VALID_LOGIN = "johndoe";
    private final static String VALID_ENCODED_PASSWORD = "$2a$10$encoded";
    
    @Nested
    @DisplayName("Factory method - create()")
    class CreateUserTests {

        @Test
        @DisplayName("Should create a valid user with all his properties")
        void shouldCreateValidUser() {

            // WHEN
            User user = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD);

            // THEN
            assertThat(user).isNotNull();
            assertThat(user.getId()).isNotNull().isNotEmpty();
            assertThat(user.getLogin()).isEqualTo(VALID_LOGIN);
            assertThat(user.getEncodedPassword()).isEqualTo(VALID_ENCODED_PASSWORD);
            assertThat(user.getCreatedAt()).isNotNull().isBeforeOrEqualTo(Instant.now());
        }
    }

    @Nested
    @DisplayName("Login field validaiton")
    class LoginValidationTests {

        @ParameterizedTest // tell to Junit it should execute the test with each passed value
        @NullAndEmptySource // null and "" values
        @ValueSource(strings = { " ", "\t", "\n" })
        @DisplayName("Should reject a null, empty or blank login")
        void shouldRejectNullOrEmptyLogin(String invalidLogin) {
            assertThatThrownBy(() -> User.create(invalidLogin, VALID_ENCODED_PASSWORD))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("Login cannot be null or empty");
        }

        private static Stream<String> invalidLoginsProvider() {
            return Stream.of("ab", "a".repeat(51));
        }

        @ParameterizedTest
        @MethodSource("invalidLoginsProvider")
        @DisplayName("Should reject login shorter than 3 char and greater than 50 char")
        void shouldRejectInvalidLogin(String invalidLogin) {
            assertThatThrownBy(() -> User.create("ab", VALID_ENCODED_PASSWORD))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("Login must be between 3 and 50 characters");
        }
    }

    @Nested
    @DisplayName("Password field validation")
    class PasswordValidationTests {

        @ParameterizedTest
        @NullAndEmptySource
        @ValueSource(strings = { " ", "\t", "\n" })
        @DisplayName("Should reject null, empty, blank password")
        void shouldRejectNullorEmptyPassword(String password) {
            assertThatThrownBy(() -> User.create(
                    VALID_LOGIN, password))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("Encoded Password cannot be null or empty");
        }
    }

    @Nested
    @DisplayName("Factory method - reconstitute()")
    class ReconstituteTests {
        @Test
        @DisplayName("Should reconstitute user from db user")
        void shouldReconstituteUserFromDbUser() {
            // Given
            String id = "123e4567-e89b-12d3-a456-426614174000";
            Instant createdAt = Instant.parse("2025-01-01T10:00:00Z");

            // WHEN
            User user = User.reconstitute(id, VALID_LOGIN, VALID_ENCODED_PASSWORD, createdAt);

            // THEN
            assertThat(user.getId()).isEqualTo(id);
            assertThat(user.getLogin()).isEqualTo(VALID_LOGIN);
            assertThat(user.getEncodedPassword()).isEqualTo(VALID_ENCODED_PASSWORD);
            assertThat(user.getCreatedAt()).isEqualTo(createdAt);
        }
    }

}

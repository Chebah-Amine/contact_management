package com.fsrapi.app.infrastructure.persistence.adapter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.fsrapi.app.domain.entity.User;
import com.fsrapi.app.infrastructure.persistence.repository.UserJpaRepository;

/**
 * Integration Tests for UserRepositoryAdapter
 * TYPE: INTEGRATION
 * JUSTIFICATION: Test the real interaction with the database
 * Database: H2 in memory for the tests
 */
@DataJpaTest // test the JPA layer (repository, entity), create an automatic db in memory H2
@Import(UserRepositoryAdapter.class)
@ActiveProfiles("test") // application-test.properties
@DisplayName("UserRepositoryAdapter - Integration Tests")
public class UserRepositoryAdapterTest {

    private final static String VALID_LOGIN = "johndoe";
    private final static String VALID_ENCODED_PASSWORD = "$2a$10$encodedSecurePassword";

    @Autowired
    private UserRepositoryAdapter userRepositoryAdapter;

    @Autowired
    private UserJpaRepository userJpaRepository;

    @AfterEach
    void cleanUp() {
        userJpaRepository.deleteAll();
    }

    @Nested
    @DisplayName("save() - Save user")
    class SaveTests {

        @Test
        @DisplayName("Should save new user in database")
        void shouldSaveNewUserInDB() {
            User newUser = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD);

            User savedUser = userRepositoryAdapter.save(newUser);

            assertThat(savedUser).isNotNull();
            assertThat(savedUser.getId()).isEqualTo(newUser.getId());
            assertThat(savedUser.getLogin()).isEqualTo(newUser.getLogin());
            assertThat(savedUser.getEncodedPassword()).isEqualTo(newUser.getEncodedPassword());
            assertThat(savedUser.getCreatedAt()).isEqualTo(newUser.getCreatedAt());

            assertThat(userJpaRepository.count()).isEqualTo(1);
        }

        @Test
        @DisplayName("Should update an existing user")
        void shouldUpdateExistingUser() {
            User existingUser = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD);
            User savedUser = userRepositoryAdapter.save(existingUser);
            User updatedUser = User.reconstitute(
                    savedUser.getId(),
                    savedUser.getLogin(),
                    "$2a$newpassword",
                    savedUser.getCreatedAt());

            User result = userRepositoryAdapter.save(updatedUser);

            assertThat(result.getEncodedPassword()).isEqualTo("$2a$newpassword");
            assertThat(userJpaRepository.count()).isEqualTo(1);
        }
    }

    @Nested
    @DisplayName("existByLogin() - Check existency")
    class ExistsByLogin {

        @Test
        @DisplayName("Should return true if the login exists")
        void shouldReturnTrueWhenLoginExists() {
            User user = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD);
            userRepositoryAdapter.save(user);

            Boolean exists = userRepositoryAdapter.existsByLogin(VALID_LOGIN);

            assertThat(exists).isTrue();
            assertThat(userJpaRepository.count()).isEqualTo(1);
        }

        @Test
        @DisplayName("Should return false if the login does not exist")
        void shouldReturnFalseWhenLoginDoesNotExist() {
            Boolean exists = userRepositoryAdapter.existsByLogin(VALID_LOGIN);

            assertThat(exists).isFalse();
            assertThat(userJpaRepository.count()).isEqualTo(0);
        }
    }

    @Nested
    @DisplayName("findByLogin() - find by login")
    class FindByLoginTests {

        @Test
        @DisplayName("Should return the user found by his login")
        void shouldReturnUserFound() {
            // GIVEN
            User user = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD);
            userRepositoryAdapter.save(user);

            // WHEN
            Optional<User> foundedUser = userRepositoryAdapter.findByLogin(VALID_LOGIN);

            // THEN
            assertThat(foundedUser.isPresent()).isTrue();
            assertThat(foundedUser.get().getId()).isEqualTo(user.getId());
            assertThat(foundedUser.get().getLogin()).isEqualTo(user.getLogin());
            assertThat(foundedUser.get().getEncodedPassword()).isEqualTo(user.getEncodedPassword());
        }

        @Test
        @DisplayName("Should return an empty Optional when login was not found")
        void shouldReturnEmptyOptionalWhenLoginNotFound() {
            // WHEN
            Optional<User> user = userRepositoryAdapter.findByLogin("loginNotFound");

            // THEN
            assertThat(user).isEmpty();
        }
    }

    @Nested
    @DisplayName("Database constraints tests")
    class DatabaseConstraintsTests {

        @Test
        @DisplayName("Should prevent saving two users with the same login")
        @Transactional(propagation = Propagation.NOT_SUPPORTED) // ← Désactive la transaction auto
        void shouldPreventSavingUsersWithSameLogin() {
            // GIVEN
            User user1 = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD);
            userRepositoryAdapter.save(user1); // auto-commit

            // WHEN / THEN
            User user2 = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD + "user2");

            assertThatThrownBy(() -> {
                userRepositoryAdapter.save(user2);
            })
                    .isInstanceOf(DataIntegrityViolationException.class)
                    .hasMessageContaining("login");
        }
    }
}

package com.fsrapi.app.application.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fsrapi.app.application.exception.UserAlreadyExistsException;
import com.fsrapi.app.domain.entity.User;
import com.fsrapi.app.domain.repository.UserRepository;
import com.fsrapi.app.domain.service.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
@DisplayName("RegisterUserService - Unit Tests")
public class RegisterUserServiceTest {

    private final static String VALID_LOGIN = "johndoe";
    private final static String VALID_RAW_PASSWORD = "SecureP@ssw0rd";
    private final static String VALID_ENCODED_PASSWORD = "$2a$10$encodedSecurePassword";

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private RegisterUserService registerUserService;

    @BeforeEach
    void setUp() {
        this.registerUserService = new RegisterUserService(userRepository, passwordEncoder);
    }

    @Nested
    @DisplayName("Nominal scenario")
    class HappyPathTests {

        @Test
        @DisplayName("Should register a user successfully")
        void shouldRegisterNewUserSuccessfully() {

            /*
             * mock dependencies methods behavior
             * simulate database saving, set generic answer,
             * repository give back the same object we passed
             */
            when(userRepository.existsByLogin(VALID_LOGIN)).thenReturn(false);
            when(passwordEncoder.encode(VALID_RAW_PASSWORD)).thenReturn(VALID_ENCODED_PASSWORD);
            when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(
                    0)); 

            // WHEN
            User user = registerUserService.register(VALID_LOGIN, VALID_RAW_PASSWORD);

            // THEN
            assertThat(user).isNotNull();
            assertThat(user.getLogin()).isEqualTo(VALID_LOGIN);
            assertThat(user.getEncodedPassword()).isEqualTo(VALID_ENCODED_PASSWORD);

            // Check interactions, if each method has been called
            verify(userRepository).existsByLogin(VALID_LOGIN);
            verify(passwordEncoder).encode(VALID_RAW_PASSWORD);
            verify(userRepository).save(any(User.class));
        }
    }

    @Nested
    @DisplayName("Errors propagations")
    class ErrorHandlingTests {

        @Test
        @DisplayName("Should throw UserAlreadyExistsException if user already exists")
        void shouldThrowUserAlreadyExistsExceptionWhenLoginExists() {

            when(userRepository.existsByLogin(VALID_LOGIN)).thenReturn(true);

            // WHEN / THEN
            assertThatThrownBy(() -> registerUserService.register(VALID_LOGIN, VALID_RAW_PASSWORD))
                    .isInstanceOf(UserAlreadyExistsException.class)
                    .hasMessage(String.format("User with login '%s' already exists", VALID_LOGIN));

            // check that don't go further in the code
            // verify(mock, times(nb time the following method is called)).method(arg);
            verify(userRepository).existsByLogin(VALID_LOGIN);
            verify(passwordEncoder, never()).encode(any()); // check encode method never called
            verify(userRepository, never()).save(any()); // check save method never called
        }

        @Test
        @DisplayName("Should throw IllegalArgumentException if the password is shorter than 8 characters")
        void shouldThrowIllegalArgumentExceptionWhenPasswordTooShort() {
            when(userRepository.existsByLogin(VALID_LOGIN)).thenReturn(false);

            assertThatThrownBy(() -> registerUserService.register(VALID_LOGIN, "shortp"))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("Password must be at least 8 characters");

            verify(userRepository).existsByLogin(VALID_LOGIN);
            verify(passwordEncoder, never()).encode(any()); // check encode method never called
            verify(userRepository, never()).save(any()); // check save method never called
        }
    }
}

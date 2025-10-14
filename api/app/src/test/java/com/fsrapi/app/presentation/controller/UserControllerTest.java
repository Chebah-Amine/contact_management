package com.fsrapi.app.presentation.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fsrapi.app.application.exception.UserAlreadyExistsException;
import com.fsrapi.app.domain.entity.User;
import com.fsrapi.app.domain.usecase.RegisterUserUseCase;
import com.fsrapi.app.presentation.dto.RegisterUserRequestDto;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class)
@DisplayName("UserController - Unit Tests")
public class UserControllerTest {

    private final static String VALID_LOGIN = "johndoe";
    private final static String VALID_RAW_PASSWORD = "SecureP@ssw0rd";
    private final static String VALID_ENCODED_PASSWORD = "$2a$10$encodedSecurePassword";
    private final static String URI = "/api/users/register";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private RegisterUserUseCase registerUserUseCase;

    @BeforeEach
    void resetMocks() {
        reset(registerUserUseCase);
    }

    @Nested
    @DisplayName("POST /api/users/register - Nominal Scenario")
    class RegisterSuccessTests {

        @Test
        @DisplayName("should register user successfully and return 201 CREATED")
        void shouldRegisterNewUserSuccessfully() throws Exception {
            // GIVEN
            RegisterUserRequestDto request = new RegisterUserRequestDto(VALID_LOGIN, VALID_RAW_PASSWORD);
            User createdUser = User.create(VALID_LOGIN, VALID_ENCODED_PASSWORD);

            when(registerUserUseCase.register(VALID_LOGIN, VALID_RAW_PASSWORD)).thenReturn(createdUser);

            // WHEN THEN
            mockMvc.perform(post(URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").isNotEmpty())
                    .andExpect(jsonPath("$.login").value("johndoe"))
                    .andExpect(jsonPath("$.createdAt").exists())
                    .andExpect(jsonPath("$.password").doesNotExist()) // should not expose the password
                    .andExpect(jsonPath("$.encodedPassword").doesNotExist());

            verify(registerUserUseCase).register(VALID_LOGIN, VALID_RAW_PASSWORD);
        }
    }

    @Nested
    @DisplayName("POST /api/users/register - Input validation")
    class InputValidationTests {

        @Test
        @DisplayName("Should reject invalid inputs (null, empty, too short, too long)")
        void shouldRejectInvalidInputs() throws Exception {
            String[] invalidRequests = {
                    "{\"login\": null, \"password\": \"Password123!\"}", // login null
                    "{\"login\": \"\", \"password\": \"Password123!\"}", // login empty
                    // login too short
                    objectMapper.writeValueAsString(new RegisterUserRequestDto("ab", "Password123!")),
                    // login too long
                    objectMapper.writeValueAsString(new RegisterUserRequestDto("a".repeat(51), "Password123!")),
                    "{\"login\": \"johndoe\", \"password\": null}", // password null
                    objectMapper.writeValueAsString(new RegisterUserRequestDto("johndoe", "")), // password empty
                    // password too short
                    objectMapper.writeValueAsString(new RegisterUserRequestDto("johndoe", "Pass1!"))
            };

            for (String req : invalidRequests) {
                mockMvc.perform(post(URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                        .andExpect(status().isBadRequest());
            }

            verify(registerUserUseCase, never()).register(any(), any());
        }
    }

    @Nested
    @DisplayName("POST /api/users/register - Hangle Business errors")
    class BusinessErrors {

        @Test
        @DisplayName("Should return 409 CONFLICT if login already exists")
        void shouldReturn409WhenLoginAlreadyExists() throws Exception {
            when(registerUserUseCase.register(any(), any())).thenThrow(new UserAlreadyExistsException(VALID_LOGIN));

            mockMvc.perform(post(URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper
                            .writeValueAsString(new RegisterUserRequestDto(VALID_LOGIN, VALID_RAW_PASSWORD))))
                    .andExpect(status().isConflict())
                    .andExpect(jsonPath("$.code").value("USER_ALREADY_EXISTS"))
                    .andExpect(jsonPath("$.message").value("User with login 'johndoe' already exists"));

        }

        @Test
        @DisplayName("Should return 400 BAD_REQUEST if input invalid")
        void shouldReturn400WhenInvalidInput() throws Exception {
            when(registerUserUseCase.register(any(),
                    any())).thenThrow(new IllegalArgumentException("Invalid input"));

            mockMvc.perform(post(URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper
                            .writeValueAsString(new RegisterUserRequestDto(VALID_LOGIN, VALID_RAW_PASSWORD))))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.code").value("INVALID_INPUT"))
                    .andExpect(jsonPath("$.message").value("Invalid input"));
        }
    }
}
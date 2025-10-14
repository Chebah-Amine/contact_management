package com.fsrapi.app.e2e;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fsrapi.app.AppApplication;
import com.fsrapi.app.infrastructure.persistence.repository.UserJpaRepository;
import com.fsrapi.app.presentation.dto.RegisterUserRequestDto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tests End-to-end for the Register User feature
 * Type: FONCTIONNAL / E2E
 * Justification: Test the entire flow from api call to db insertion
 * Scope: Every layers
 * Config: Spring boot application with H2 db in memory
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = AppApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
@DisplayName("Register user - Tests End-to-End")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class) // force Junit to execute the tests in pre-define order
public class RegisterUserE2ETest {
    private final static String VALID_LOGIN = "johndoe";
    private final static String VALID_RAW_PASSWORD = "SecureP@ssw0rd";
    private final static String URI = "/api/users/register";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserJpaRepository userJpaRepository;

    @BeforeEach
    void setUp() {
        userJpaRepository.deleteAll();
    }

    @Nested
    @DisplayName("Nominal case - Register user in database")
    class SuccessfullRegisterScenario {

        @Test
        @DisplayName("E2E: Should register new user with success")
        void shouldRegisterNewUserSuccessfully() throws Exception {
            // GIVEN
            RegisterUserRequestDto request = new RegisterUserRequestDto(VALID_LOGIN,
                    VALID_RAW_PASSWORD);

            // WHEN / THEN
            MvcResult result = mockMvc.perform(post(URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").exists())
                    .andExpect(jsonPath("$.login").value(VALID_LOGIN))
                    .andExpect(jsonPath("$.createdAt").exists())
                    .andExpect(jsonPath("$.password").doesNotExist())
                    .andReturn();

            // THEN check response body
            String responseBody = result.getResponse().getContentAsString();
            assertThat(responseBody).contains(VALID_LOGIN);
            assertThat(responseBody).doesNotContain("password");
            assertThat(responseBody).doesNotContain(VALID_RAW_PASSWORD);

            // THEN check database
            var users = userJpaRepository.findAll();
            assertThat(users).hasSize(1);
            assertThat(users.get(0).getLogin()).isEqualTo(VALID_LOGIN);
            assertThat(users.get(0).getEncodedPassword()).startsWith("$2a$10$");
            assertThat(users.get(0).getEncodedPassword()).isNotEqualTo(VALID_RAW_PASSWORD);
        }
    }

    @Nested
    @DisplayName("Error scenario - Existing login")
    class DuplicationLoginScenario {

        @Test
        @DisplayName("Should throw a USER_ALREADY_EXISTS error")
        void shouldRejectDuplicationLogin() throws Exception {
            // GIVEN - First user registered
            RegisterUserRequestDto request = new RegisterUserRequestDto(VALID_LOGIN, VALID_RAW_PASSWORD);

            mockMvc.perform(post(URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated());

            // WHEN - Register second user with same login
            RegisterUserRequestDto secondRequest = new RegisterUserRequestDto(VALID_LOGIN, VALID_RAW_PASSWORD);

            mockMvc.perform(post(URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(secondRequest)))
                    .andExpect(status().isConflict())
                    .andExpect(jsonPath("$.code").value("USER_ALREADY_EXISTS"))
                    .andExpect(jsonPath("$.message")
                            .value(String.format("User with login '%s' already exists", VALID_LOGIN)));

            assertThat(userJpaRepository.count()).isEqualTo(1);
        }
    }

    @Nested
    @DisplayName("Error scenario - Invalid argument")
    class ValidationErrorScenario {

        @Test
        @DisplayName("Should reject request with invalid login")
        void shouldRejectRequestsWithInvalidInputs() throws Exception {
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

            assertThat(userJpaRepository.count()).isEqualTo(0);
        }
    }

}

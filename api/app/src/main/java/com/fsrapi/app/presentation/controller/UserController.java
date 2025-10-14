package com.fsrapi.app.presentation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsrapi.app.application.exception.UserAlreadyExistsException;
import com.fsrapi.app.domain.entity.User;
import com.fsrapi.app.domain.usecase.RegisterUserUseCase;
import com.fsrapi.app.presentation.ErrorResponse;
import com.fsrapi.app.presentation.dto.RegisterUserRequestDto;
import com.fsrapi.app.presentation.dto.RegisterUserResponseDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final RegisterUserUseCase registerUserUseCase;

    public UserController(RegisterUserUseCase registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }

    /**
     * Endpoint for user sign up
     * POST /api/users/register
     * 
     * @param request
     * @return created user
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> register(
            @Valid @RequestBody RegisterUserRequestDto request) {
        User user = this.registerUserUseCase.register(request.getLogin(), request.getPassword());

        RegisterUserResponseDto response = RegisterUserResponseDto.from(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        ErrorResponse error = new ErrorResponse(
                "USER_ALREADY_EXISTS",
                ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(error);

    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        ErrorResponse error = new ErrorResponse("INVALID_INPUT", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }

}

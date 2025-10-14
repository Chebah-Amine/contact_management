package com.fsrapi.app.domain.service;

public interface PasswordEncoder {
    String encode(String password);

    boolean matches(String password, String encodedPassword);
}

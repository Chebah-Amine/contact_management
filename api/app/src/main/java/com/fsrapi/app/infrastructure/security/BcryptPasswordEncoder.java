package com.fsrapi.app.infrastructure.security;

import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.fsrapi.app.domain.service.PasswordEncoder;

@Component
public class BcryptPasswordEncoder implements PasswordEncoder {
    private final BCryptPasswordEncoder bCryptEncoder;

    public BcryptPasswordEncoder() {
        this.bCryptEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public String encode(String password) {
        return this.bCryptEncoder.encode(password);
    }

    @Override
    public boolean matches(String password, String encodedPassword) {
        return this.bCryptEncoder.matches(password, encodedPassword);
    }

}

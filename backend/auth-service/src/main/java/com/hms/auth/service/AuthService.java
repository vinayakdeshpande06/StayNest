package com.hms.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.auth.dto.AuthResponse;
import com.hms.auth.dto.LoginRequest;
import com.hms.auth.entity.User;
import com.hms.auth.repository.UserRepository;
import com.hms.auth.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public String register(User user){

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        repository.save(user);
        return "User Registered";
    }

    public AuthResponse login(LoginRequest request){

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                    new RuntimeException("User not found"));

        if(!encoder.matches(
                request.getPassword(),
                user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        String token =
                jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getId());
    }
}

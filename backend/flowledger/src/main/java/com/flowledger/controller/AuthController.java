package com.flowledger.controller;

import com.flowledger.dto.LoginRequest;
import com.flowledger.dto.LoginResponse;
import com.flowledger.dto.RegisterRequest;
import com.flowledger.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {

        return userService.registerUser(request);

    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        String token = userService.loginUser(request);

        return new LoginResponse(token);

    }

}
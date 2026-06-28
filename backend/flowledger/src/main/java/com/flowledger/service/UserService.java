package com.flowledger.service;

import com.flowledger.dto.LoginRequest;
import com.flowledger.dto.RegisterRequest;

public interface UserService {

    String registerUser(RegisterRequest request);

    String loginUser(LoginRequest request);

}
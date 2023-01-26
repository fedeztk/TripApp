package com.TripApp.auth.service;

import com.TripApp.auth.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserByUserId(String userId);
    Optional<User> getUserByEmail(String email);
}

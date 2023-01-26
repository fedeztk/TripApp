package com.TripApp.auth.controller;


import com.TripApp.auth.model.User;
import com.TripApp.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // get a user's by their email
    @GetMapping("/email/{email}")
    @CrossOrigin
    public ResponseEntity<?> getUserIdByEmail(@PathVariable String email) {
        try {
            Optional<User> optUser = userService.getUserByEmail(email);
            if (optUser.isPresent()) {
                return ResponseEntity.ok(optUser.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

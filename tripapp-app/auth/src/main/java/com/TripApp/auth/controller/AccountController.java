package com.TripApp.auth.controller;

import com.TripApp.auth.model.Account;
import com.TripApp.auth.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/{userId}")
    @CrossOrigin
    public ResponseEntity<?> getAccountByUserIdAndAccessToken(@RequestHeader("Authorization") String accessToken, @PathVariable String userId) {
        try {
            // Strip the "Bearer " from the accessToken
            Optional<Account> optAccount = accountService.getAccountByUserIdAndAccessToken(userId, accessToken.substring(7));
            if (optAccount.isPresent()) {
                return new ResponseEntity<>(optAccount.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No account found for userId: " + userId + " and accessToken: " + accessToken, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
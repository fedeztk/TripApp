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

    @GetMapping("/auth/{userId}")
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
            return errorResponse();
        }
    }

//    @GetMapping("/tmp/{userId}")
//    public ResponseEntity<?> getAccountByUserId(@PathVariable String userId) {
//        try {
//            Optional<Account> optAccount = accountService.getAccountByUserId(userId);
//            if (optAccount.isPresent()) {
//                return new ResponseEntity<>(optAccount.get(), HttpStatus.OK);
//            } else {
//                return noAccountFoundResponse(userId);
//            }
//        } catch (Exception e) {
//            return errorResponse();
//        }
//    }

//    @GetMapping("/get/{id}")
//    public ResponseEntity<?> getAccountById(@PathVariable String id) {
//        try {
//            Optional<Account> optAccount = accountService.getAccountById(id);
//            if (optAccount.isPresent()) {
//                return new ResponseEntity<>(optAccount.get(), HttpStatus.OK);
//            } else {
//                return noAccountFoundResponse(id);
//            }
//        } catch (Exception e) {
//            return errorResponse();
//        }
//    }

//    @GetMapping("/")
//    public ResponseEntity<?> getAllAccounts() {
//        try {
//            return new ResponseEntity<>(accountService.getAllAccounts(), HttpStatus.OK);
//        } catch (Exception e) {
//            return errorResponse();
//        }
//    }


    private ResponseEntity<String> errorResponse() {
        return new ResponseEntity<>("Something went wrong 😥", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<String> noAccountFoundResponse(String id) {
        return new ResponseEntity<>("No account found with id: " + id, HttpStatus.NOT_FOUND);
    }
}
package com.TripApp.auth.service;

import com.TripApp.auth.model.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    Optional<Account> getAccountByUserId(String userId);
    Optional<Account> getAccountByUserIdAndAccessToken(String userId, String accessToken);
    Optional<Account> getAccountById(String id);

    List<Account> getAllAccounts();
}

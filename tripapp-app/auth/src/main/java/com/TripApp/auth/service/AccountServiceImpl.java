package com.TripApp.auth.service;

import com.TripApp.auth.model.Account;
import com.TripApp.auth.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> getAccountByUserId(String userId) {
        return accountRepository.findByUserId(userId);
    }

    @Override
    public Optional<Account> getAccountByUserIdAndAccessToken(String userId, String accessToken) {
        return accountRepository.findByUserIdAndAccessToken(userId, accessToken);
    }

    @Override
    public Optional<Account> getAccountById(String id) {
        return accountRepository.findById(id);
    }
}

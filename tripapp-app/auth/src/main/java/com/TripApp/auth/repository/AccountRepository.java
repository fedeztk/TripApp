package com.TripApp.auth.repository;

import com.TripApp.auth.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    @Query("{'userId' : ?0}")
    Optional<Account> findByUserId(String userId);

    @Query("{'userId':?0, 'access_token':?1}")
    Optional<Account> findByUserIdAndAccessToken(String userId, String accessToken);
}

package com.TripApp.auth.repository;

import com.TripApp.auth.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<User, String> {
//    Optional<Session> findByEmail(String email);
}

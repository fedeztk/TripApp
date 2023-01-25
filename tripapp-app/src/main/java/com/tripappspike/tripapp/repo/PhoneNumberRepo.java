package com.tripappspike.tripapp.repo;

import com.tripappspike.tripapp.model.PhoneNumberDB;
import com.tripappspike.tripapp.model.PhoneNumbers;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PhoneNumberRepo extends CrudRepository<PhoneNumberDB, Long> {


    Optional<PhoneNumbers> findByTag(String tag);

}

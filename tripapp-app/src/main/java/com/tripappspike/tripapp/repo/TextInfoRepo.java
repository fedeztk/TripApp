package com.tripappspike.tripapp.repo;

import com.tripappspike.tripapp.model.PhoneNumbers;
import com.tripappspike.tripapp.model.TextInfo;
import com.tripappspike.tripapp.model.TextInfoDB;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TextInfoRepo extends CrudRepository<TextInfoDB, Long> {


    Optional<TextInfo> findByTag(String tag);

}

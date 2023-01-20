package com.TripApp.group.repository;

import com.TripApp.group.model.Group;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends CrudRepository<Group, String> {
    @Query("select g from Group g inner join g.members members where members.userId = ?1")
    List<Group> findByMembers_UserId(String userId);
}

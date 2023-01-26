package com.TripApp.group.repository;

import com.TripApp.group.model.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends CrudRepository<Member, String> {
    List<Member> getAllMembersByGroupId(Long groupId);

    @Query("select m from Member m where m.group.id = ?1 and m.userId = ?2")
    Optional<Member> findByGroup_IdAndUserId(Long id, String userId);
}

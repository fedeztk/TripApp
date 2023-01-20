package com.TripApp.group.service;

import com.TripApp.group.model.Group;
import com.TripApp.group.model.Member;

import java.util.List;

public interface MemberService {
    List<Member> getAllMembersByGroupId(Long groupId);
    Member saveNewMember(String memberId, Group group);

    Member getMemberByUserIdAndGroupId(String newMemberId, Long groupId);
}

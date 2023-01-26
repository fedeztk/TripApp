package com.TripApp.group.service;

import com.TripApp.group.model.Group;
import com.TripApp.group.model.GroupDTO;
import com.TripApp.group.model.Member;
import com.TripApp.group.model.MemberDTO;

import java.util.List;

public interface MemberService {
    List<Member> getAllMembersByGroupId(Long groupId);
    void saveNewMember(String userId, String name, Group group);

    void deleteMember(Member member);

    Member getMemberByUserIdAndGroupId(String newMemberId, Long groupId);
}

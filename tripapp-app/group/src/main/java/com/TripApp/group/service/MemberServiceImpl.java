package com.TripApp.group.service;

import com.TripApp.group.model.Group;
import com.TripApp.group.model.Member;
import com.TripApp.group.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    @Override
    @Transactional
    public List<Member> getAllMembersByGroupId(Long groupId) {
        return memberRepository.getAllMembersByGroupId(groupId);
    }

    @Override
    @Transactional
    public Member saveNewMember(String userId, Group group) {
        Member member = new Member();
        member.setUserId(userId);
        member.setGroup(group);
        return memberRepository.save(member);
    }

    @Override
    @Transactional
    public Member getMemberByUserIdAndGroupId(String newMemberId, Long groupId) {
        return memberRepository.findByGroup_IdAndUserId(groupId, newMemberId).orElse(null);
    }
}

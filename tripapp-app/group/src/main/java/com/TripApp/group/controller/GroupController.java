package com.TripApp.group.controller;

import com.TripApp.group.model.Group;
import com.TripApp.group.model.GroupDTO;
import com.TripApp.group.model.Member;
import com.TripApp.group.service.GroupService;
import com.TripApp.group.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class GroupController {
    private final GroupService groupService;
    private final MemberService memberService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> createGroup(@PathVariable String userId, @RequestBody GroupDTO group) {
        try {
            Group newGroup = groupService.saveNewGroup(group);
            memberService.saveNewMember(userId, newGroup);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // let a user that is a member of a group add a new member to the group
    @PostMapping("/{userId}/{groupId}")
    public ResponseEntity<?> addMemberToGroup(@PathVariable String userId, @PathVariable Long groupId, @RequestBody String newMemberId) {
        try {
            // check if the user is a member of the group
            Member member = memberService.getMemberByUserIdAndGroupId(userId, groupId);
            if (member != null) {
                // check if the new member is already a member of the group
                Member newMember = memberService.getMemberByUserIdAndGroupId(newMemberId, groupId);
                if (newMember == null) {
                    // add the new member to the group
                    memberService.saveNewMember(newMemberId, member.getGroup());
                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.badRequest().body("User is already a member of the group");
                }
            } else {
                return ResponseEntity.badRequest().body("User is not a member of the group");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{userId}")
    public List<GroupResponse> getAllGroupsByUserId(@PathVariable String userId) {
        List<Group> groups = groupService.getAllGroupsByUserId(userId);
        List<GroupResponse> groupResponses = new ArrayList<>();
        for (Group group : groups) {
            List<Member> members = memberService.getAllMembersByGroupId(group.getId());
            groupResponses.add(new GroupResponse(group, members));
        }
        return groupResponses;
    }
}

@Getter
@Setter
class GroupResponse {
    private String name;
    private Long id;
    private List<String> members;

    public GroupResponse(Group group, List<Member> members) {
        this.name = group.getName();
        this.id = group.getId();
        this.members = new ArrayList<>();
        for (Member member : members) {
            this.members.add(member.getUserId());
        }
    }
}

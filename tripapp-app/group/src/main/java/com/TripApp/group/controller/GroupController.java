package com.TripApp.group.controller;

import com.TripApp.group.model.Group;
import com.TripApp.group.model.GroupDTO;
import com.TripApp.group.service.GroupService;
import com.TripApp.group.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groups")
public class GroupController {
    private final GroupService groupService;
    private final MemberService memberService;

    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<?> getAllGroupsByUserId(@RequestHeader("userId") String userId) {
        try {
            List<Group> groups = groupService.getAllGroupsByUserId(userId);
            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{userName}")
    @CrossOrigin
    public ResponseEntity<?> createGroup(@RequestHeader("userId") String userId, @RequestBody GroupDTO group, @PathVariable String userName) {
        try {
            Group newGroup = groupService.saveNewGroup(group);
            memberService.saveNewMember(userId, userName, newGroup);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Component
    class RabbitController {
        @RabbitListener(queues = "groupQueue")
        public void consumeDeleteGroupById(String groupId) {
            groupService.deleteGroupById(groupId);
        }
    }
}
package com.TripApp.group.controller;

import com.TripApp.group.config.RabbitMqConfig;
import com.TripApp.group.model.Member;
import com.TripApp.group.service.MemberService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @Value("${auth.url}")
    private String authUrl;

    @Autowired
    private RabbitTemplate rabbitTemplate;
    public String exchange = "deleteGroup";


    // let a user that is a member of a group add a new member to the group from its email
    @PostMapping("/{groupId}")
    @CrossOrigin
    public ResponseEntity<?> addMemberFromEmail(@RequestHeader("userId") String userId, @PathVariable Long groupId, @RequestParam String email) {
        try {
            // check if the user is a member of the group
            Member member = memberService.getMemberByUserIdAndGroupId(userId, groupId);
            if (member != null) {
                // get the new member's ID from its email
                WebClient webClient = WebClient.create(authUrl);
                ResponseEntity<JsonNode> response = webClient.get().uri("/users/email/" + email)
                        .exchangeToMono(clientResponse -> clientResponse.toEntity(JsonNode.class)).block();
                assert response != null;
                if (response.getStatusCode().is2xxSuccessful()) {
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode root = mapper.readTree(response.getBody().toString());
                    String newUserName = root.path("name").asText();
                    String newUserId = root.path("id").asText();
                    // check if the new member is already a member of the group
                    Member newMember = memberService.getMemberByUserIdAndGroupId(newUserId, groupId);
                    if (newMember == null) {
                        // add the new member to the group
                        memberService.saveNewMember(newUserId, newUserName, member.getGroup());
                        return ResponseEntity.ok().build();
                    } else {
                        return ResponseEntity.badRequest().body("User is already a member of the group");
                    }
                } else {
                    return ResponseEntity.badRequest().body("User does not exist");
                }
            } else {
                return ResponseEntity.badRequest().body("User is not a member of the group");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{groupId}")
    @CrossOrigin
    public ResponseEntity<?> deleteMember(@RequestHeader("userId") String userId, @PathVariable Long groupId) {
        try {
            // check if the user is a member of the group
            Member member = memberService.getMemberByUserIdAndGroupId(userId, groupId);
            if (member != null) {
                // delete the member
                memberService.deleteMember(member);

                // if the group has no more members, delete the group
                if (memberService.getAllMembersGroupId(groupId).isEmpty()) {
                    rabbitTemplate.convertAndSend(exchange, "", groupId);
                }

                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().body("User is not a member of the group");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

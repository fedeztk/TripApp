package com.TripApp.group.service;

import com.TripApp.group.model.Group;
import com.TripApp.group.model.GroupDTO;
import com.TripApp.group.repository.GroupRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;

    @Override
    @Transactional
    public List<Group> getAllGroupsByUserId(String userId) {
        return groupRepository.findByMembers_UserId(userId);
    }

    @Override
    @Transactional
    public Group saveNewGroup(GroupDTO groupDTO) {
        return groupRepository.save(convertGroupDTOToGroup(groupDTO));
    }

    @Override
    @Transactional
    public Group getGroupById(String groupId) {
        return groupRepository.findById(groupId).orElse(null);
    }

    @Override
    public void deleteGroupById(String groupId) {
        groupRepository.deleteById(groupId);
    }

    private Group convertGroupDTOToGroup(GroupDTO groupDTO) {
        Group group = new Group();
        group.setName(groupDTO.getName());
        group.setIso(groupDTO.getIso());
        return group;
    }
}

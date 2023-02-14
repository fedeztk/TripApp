package com.TripApp.group.service;

import com.TripApp.group.model.Group;
import com.TripApp.group.model.GroupDTO;

import java.util.List;

public interface GroupService {
    List<Group> getAllGroupsByUserId(String userId);
    Group saveNewGroup(GroupDTO groupDTO);

    Group getGroupById(String groupId);

    void deleteGroupById(String groupId);
}

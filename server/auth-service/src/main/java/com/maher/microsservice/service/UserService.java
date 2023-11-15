package com.maher.microsservice.service;

import com.maher.microsservice.entities.Role;
import com.maher.microsservice.entities.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    User findUserByUsername (String username);
    Role addRole(Role role);
    User addRoleToUser(long id, Role r);
    List<User> findAllUsers();
    User findUserById(Long id);
    List<Role> findAllRoles();
    Role findRoleById(Long id);
    void deleteUser(long id);
    User removeRoleFromUser(long id, Role r);
    List<Role> findUserRolesById(Long id);

    User activateUser(String username, String code);
}


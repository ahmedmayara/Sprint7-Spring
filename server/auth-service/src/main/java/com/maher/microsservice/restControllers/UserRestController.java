package com.maher.microsservice.restControllers;

import java.util.List;

import com.maher.microsservice.entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.maher.microsservice.entities.User;
import com.maher.microsservice.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {
    @Autowired
    UserService userService;
    @RequestMapping(path = "allUsers", method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @RequestMapping(path="addUser", method=RequestMethod.POST)
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @RequestMapping(path="addRole/{id}",method=RequestMethod.POST)
    public User addRoleToUser(@PathVariable long id,@RequestBody Role r) {
        return userService.addRoleToUser(id, r);
    }

    @RequestMapping(path="user/{id}",method=RequestMethod.GET)
    public User findUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @RequestMapping(path="allRoles",method=RequestMethod.GET)
    public List<Role> getAllRoles() {
        return userService.findAllRoles();
    }

    @RequestMapping(path="role/{id}",method=RequestMethod.GET)
    public Role findRoleById(@PathVariable Long id) {
        return userService.findRoleById(id);
    }

    @RequestMapping(path="delete/{id}",method=RequestMethod.DELETE)
    public void deleteUserById(@PathVariable long id) {
         userService.deleteUser(id);
    }

    @RequestMapping(path="removeRole/{id}",method=RequestMethod.POST)
    public User removeRole(@PathVariable long id,@RequestBody Role r)
    {
        return  userService.removeRoleFromUser(id,r);
    }

    @RequestMapping(path="userRoles/{id}",method=RequestMethod.GET)
    public List<Role> findUserRolesById(@PathVariable Long id) {
        return userService.findUserRolesById(id);
    }

    @RequestMapping(path="activate/{username}/{code}",method=RequestMethod.GET)
    public User activateUser(@PathVariable String username,@PathVariable String code) {
        return userService.activateUser(username,code);
    }
}

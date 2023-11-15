package com.maher.microsservice.service;

import com.maher.microsservice.Repos.RoleRepository;
import com.maher.microsservice.Repos.UserRepository;
import com.maher.microsservice.entities.Role;
import com.maher.microsservice.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Transactional
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRep;
    @Autowired
    RoleRepository roleRep;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String mailAddress;
    @Override
    public User saveUser(User user) {
        Random random = new Random();
        String verificationCode = String.format("%04d", random.nextInt(10000));

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setSubject("Activation Code");
        simpleMailMessage.setText("Your activation code is: " + verificationCode);
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setFrom(mailAddress);
        javaMailSender.send(simpleMailMessage);

        user.setVerificationCode(verificationCode);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRep.save(user);
    }
    @Override
    public User addRoleToUser(long id, Role r) {
        User usr = userRep.findUserById(id);

        List<Role> roles = usr.getRoles();
        roles.add(r);

        usr.setRoles(roles);

        return userRep.save(usr);
    }


    @Override
    public List<User> findAllUsers() {
        return userRep.findAll();
    }

    @Override
    public Role addRole(Role role) {
        return roleRep.save(role);
    }
    @Override
    public User findUserByUsername(String username) {
        return userRep.findByUsername(username);
    }


    @Override
    public User findUserById(Long id) {
        return userRep.findById(id).get();
    }

    @Override
    public List<Role> findAllRoles() {
        return roleRep.findAll();
    }
    @Override
    public Role findRoleById(Long id) {
        return roleRep.findRoleById(id);
    }

    @Override
    public void deleteUser(long id) {
        userRep.deleteByUserId(id);
    }
    @Override
    public User removeRoleFromUser(long id,Role r)
    {
        User user = userRep.findUserById(id);
        List<Role> listOfRoles = user.getRoles();
        listOfRoles.remove(r);
        userRep.save(user);
        return user;
    }

    @Override
    public List<Role> findUserRolesById(Long id) {
        User user = userRep.findUserById(id);
        List<Role> listOfRoles = user.getRoles();
        return listOfRoles;
    }

    @Override
    public User activateUser(String username, String code) {
        User user = userRep.findByUsername(username);
        if(user.getVerificationCode().equals(code)){
            user.setEnabled(true);
            user.setVerificationCode(null);
            userRep.save(user);
        }
        return user;
    }
}

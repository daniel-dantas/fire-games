package com.translucent.firegamesback.controller;

import com.translucent.firegamesback.model.User;
import com.translucent.firegamesback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {

        if (this.userRepository.existsById(user.getEmail())) throw new RuntimeException("Error");

        return new ResponseEntity<User>(this.userRepository.save(user), HttpStatus.CREATED);
    }

}

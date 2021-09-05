package com.translucent.firegamesback.controller;

import com.translucent.firegamesback.dto.RegisterResponseDTO;
import com.translucent.firegamesback.exceptions.DuplicateException;
import com.translucent.firegamesback.model.User;
import com.translucent.firegamesback.repository.UserRepository;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody User user) {

        if(this.userRepository.getByEmail(user.getEmail()).isPresent()) throw new DuplicateException("This email already belongs to a user");

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setMyGames(new ArrayList());
        User userSaved = this.userRepository.save(user);
        return new ResponseEntity<>(new RegisterResponseDTO(userSaved.getId(), userSaved.getEmail()), HttpStatus.CREATED);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

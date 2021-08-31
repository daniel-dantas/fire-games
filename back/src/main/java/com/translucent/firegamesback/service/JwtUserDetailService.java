package com.translucent.firegamesback.service;

import java.util.ArrayList;

import com.translucent.firegamesback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.translucent.firegamesback.model.User user = userService.getByEmail(email).get();

        if (user.getEmail().equals(email)) {
            return new User(email, user.getPassword(),
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }
}
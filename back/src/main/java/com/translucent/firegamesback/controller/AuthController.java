package com.translucent.firegamesback.controller;

import com.translucent.firegamesback.config.JwtTokenUtil;
import com.translucent.firegamesback.dto.LoginDTO;
import com.translucent.firegamesback.dto.LoginResponseDTO;
import com.translucent.firegamesback.service.JwtUserDetailService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailService userDetailsService;

    @ApiOperation("Route made for user authentication")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Successfully authenticated user"),
            @ApiResponse(code = 401, message = "There is no user with these credentials")

    })
    @PostMapping
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginDTO authenticationRequest) throws Exception {

        System.out.println(authenticationRequest);

        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

        System.out.println(auth);

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
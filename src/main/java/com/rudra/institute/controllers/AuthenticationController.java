package com.rudra.institute.controllers;


import com.rudra.institute.dto.AuthenticationRequest;
import com.rudra.institute.dto.AuthenticationResponse;
import com.rudra.institute.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public AuthenticationResponse createAuthenticationToken(
            @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse response
    ) throws IOException {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(), authenticationRequest.getPassword()
                    )
            );
        } catch ( BadCredentialsException exception) {
            throw new BadCredentialsException("Incorrect Username and password");
        } catch ( DisabledException e){
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Your account is disabled");
            return null;
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername( authenticationRequest.getEmail());

        final String jwt = jwtUtil.generateToken(userDetails);
        return new AuthenticationResponse(jwt);
    }
}

package com.rudra.institute.controllers;


import com.rudra.institute.dto.AuthenticationRequest;
import com.rudra.institute.dto.AuthenticationResponse;
import com.rudra.institute.entities.User;
import com.rudra.institute.repositories.UserRepository;
import com.rudra.institute.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
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
import java.util.Optional;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRINF = "Authorization ";
    @PostMapping("/authenticate")
    public void createAuthenticationToken(
            @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse response
    ) throws IOException, JSONException {
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
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername( authenticationRequest.getEmail());

        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        if(optionalUser.isPresent()){
            response.getWriter().write(
                    new JSONObject()
                            .put("userId", optionalUser.get().getId())
                            .put("role", optionalUser.get().getRole())
                            .toString()
            );
        }

        response.setHeader("Access-Control-Expose-Headers", "Authorization");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, X-Pingother, Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
        response.setHeader(HEADER_STRINF, TOKEN_PREFIX + jwt);
//        return new AuthenticationResponse(jwt);
    }
}

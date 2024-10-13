package com.rudra.institute.services.admin;

import com.rudra.institute.entities.User;
import com.rudra.institute.enums.UserRole;
import com.rudra.institute.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl {

    private final UserRepository userRepository;

    public AdminServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void createAdminAccount() {
        User admin = userRepository.findByRole(UserRole.ADMIN);

        if( admin == null ){
            User adminAccount = new User();
            adminAccount.setUsername("admin");
            adminAccount.setPassword(
                    new BCryptPasswordEncoder().encode("admin")
            );
            adminAccount.setRole(UserRole.ADMIN);
            adminAccount.setEmail("admin@admin.com");
            this.userRepository.save(adminAccount);
        }
    }

}

package com.rudra.institute.repositories;

import com.rudra.institute.entities.User;
import com.rudra.institute.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByRole(UserRole role);

    Optional<User> findFirstByEmail(String email);
}

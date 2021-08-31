package com.translucent.firegamesback.repository;

import com.translucent.firegamesback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> getByEmail(String email);
}

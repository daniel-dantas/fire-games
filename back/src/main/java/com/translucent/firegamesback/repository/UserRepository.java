package com.translucent.firegamesback.repository;

import com.translucent.firegamesback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

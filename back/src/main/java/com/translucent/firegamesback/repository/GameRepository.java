package com.translucent.firegamesback.repository;

import com.translucent.firegamesback.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}

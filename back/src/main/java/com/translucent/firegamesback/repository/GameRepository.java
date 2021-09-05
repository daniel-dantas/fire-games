package com.translucent.firegamesback.repository;

import com.translucent.firegamesback.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findAllByOrderByYearDesc();
}

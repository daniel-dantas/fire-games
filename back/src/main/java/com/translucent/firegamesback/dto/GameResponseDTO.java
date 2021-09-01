package com.translucent.firegamesback.dto;

import com.sun.istack.NotNull;
import com.translucent.firegamesback.model.Console;
import com.translucent.firegamesback.model.Game;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Getter
@AllArgsConstructor
public class GameResponseDTO{
    private Long id;

    private String front_cover;
    private String title;
    private int year;
    private Console console;

    private int age;

    public static GameResponseDTO parseGame(Game game) {
        return new GameResponseDTO(game.getId(), game.getFront_cover(), game.getTitle(), game.getYear(), game.getConsole(),  (LocalDate.now().getYear() - game.getYear()));
    }
}

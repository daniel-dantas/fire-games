package com.translucent.firegamesback;

import com.translucent.firegamesback.model.Console;
import com.translucent.firegamesback.model.Game;
import com.translucent.firegamesback.repository.GameRepository;
import com.translucent.firegamesback.repository.MyGameAnnotationRepository;
import com.translucent.firegamesback.repository.UserRepository;
import com.translucent.firegamesback.validations.GameValidation;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.AdditionalAnswers;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

import static org.mockito.Mockito.*;

@SpringBootTest
class FireGamesBackApplicationTests {

    private final UserRepository userRepository = Mockito.mock(UserRepository.class);
    private final GameRepository gameRepository = Mockito.mock(GameRepository.class);
    private final MyGameAnnotationRepository myGameAnnotationRepository = Mockito.mock(MyGameAnnotationRepository.class);

    private final GameValidation gameValidate = Mockito.mock(GameValidation.class);

    @Test
    void contextLoads() {
    }

    @Test
    @DisplayName("Testing game saves")
    public void saveGame() {
        Game game = new Game(Long.parseLong("1"),"https://www.showmetech.com.br/wp-content/uploads//2015/04/gta-v-capa-1200x1481.jpg", "GTA V", 2012, Console.PC);

        when(this.gameRepository.save(game)).then(AdditionalAnswers.returnsFirstArg());
        doNothing().when(gameValidate).validate(game);

    }
}

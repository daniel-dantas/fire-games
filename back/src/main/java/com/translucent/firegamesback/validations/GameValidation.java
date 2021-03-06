package com.translucent.firegamesback.validations;

import com.translucent.firegamesback.exceptions.MaximumYearExceededException;
import com.translucent.firegamesback.exceptions.MinimumYearExceededException;
import com.translucent.firegamesback.exceptions.ParameterExceededException;
import com.translucent.firegamesback.model.Game;

import java.time.LocalDate;

public abstract class GameValidation {

    private static final int MINIMUM_YEAR = 1970;

    public static void validate(Game game) {
        if (game.getTitle().length() > 100) {
            throw new ParameterExceededException();
        } else if (game.getYear() < GameValidation.MINIMUM_YEAR) {
            throw new MinimumYearExceededException();
        } else if (game.getYear() > LocalDate.now().getYear()){
            throw new MaximumYearExceededException();
        }
    }

}

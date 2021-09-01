package com.translucent.firegamesback.validations;

import com.translucent.firegamesback.exceptions.InvalidDateException;
import com.translucent.firegamesback.model.MyGameAnnotation;

import java.time.LocalDate;

public abstract class MyGameAnnotationValidation {

    public static void validate(MyGameAnnotation myGame) {
        if(myGame.getConclusionDate() != null && myGame.getConclusionDate().isAfter(LocalDate.now())){
            throw new InvalidDateException();
        }
    }

}

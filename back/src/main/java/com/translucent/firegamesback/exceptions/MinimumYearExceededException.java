package com.translucent.firegamesback.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MinimumYearExceededException extends RuntimeException{
    public MinimumYearExceededException() {
        super("Minimum game year exceeded");
    }
}

package com.translucent.firegamesback.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MaximumYearExceededException extends RuntimeException{
    public MaximumYearExceededException() {
        super("Maximum game Year Exceeded");
    }
}

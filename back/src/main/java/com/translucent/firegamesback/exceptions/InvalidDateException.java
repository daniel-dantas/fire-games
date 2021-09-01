package com.translucent.firegamesback.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidDateException extends RuntimeException{
    public InvalidDateException() {
        super("The date entered is invalid");
    }
}

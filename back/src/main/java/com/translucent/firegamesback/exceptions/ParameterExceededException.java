package com.translucent.firegamesback.exceptions;

public class ParameterExceededException extends RuntimeException{
    public ParameterExceededException() {
        super("Number of characters exceeded");
    }
}

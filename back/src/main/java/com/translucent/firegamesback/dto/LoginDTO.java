package com.translucent.firegamesback.dto;

import lombok.Data;

import java.io.Serializable;
@Data
public class LoginDTO implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    private String email;
    private String password;

}
package com.translucent.firegamesback.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class RegisterResponseDTO {
    private Long id;
    private String email;
}

package com.translucent.firegamesback.model;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @NotNull
    private String username;

    @Id
    @NotNull
    private String email;

    @NotNull
    private String password;

    @OneToMany(targetEntity = MyGameAnnotation.class)
    private List my_games;
}

package com.translucent.firegamesback.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_my_game_annotation")
public class MyGameAnnotation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Boolean concluded;
    @NotNull
    private LocalDate conclusion_date;
    @NotNull
    private String personal_notes;

    @NotNull
    @ManyToOne
    private Game game;

}

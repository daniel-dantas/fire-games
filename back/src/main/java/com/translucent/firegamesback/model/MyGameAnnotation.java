package com.translucent.firegamesback.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyGameAnnotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Boolean concluded;
    @NotNull
    private LocalDate conclusion_date;
    @NotNull
    private String personal_notes;

    @ManyToOne
    private Game game;

}

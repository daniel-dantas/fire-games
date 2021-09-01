package com.translucent.firegamesback.dto;

import com.sun.istack.NotNull;
import com.translucent.firegamesback.model.Game;
import com.translucent.firegamesback.model.MyGameAnnotation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Data
@Getter
@AllArgsConstructor
public class MyGameAnnotationResponseDTO {
    private Long id;
    private Boolean concluded;
    private LocalDate conclusionDate;
    private String personalNotes;
    private GameResponseDTO game;

    public static MyGameAnnotationResponseDTO parseGameAnnotation(MyGameAnnotation gameAnnotation) {
        return new MyGameAnnotationResponseDTO(gameAnnotation.getId(), gameAnnotation.getConcluded(),
                                                gameAnnotation.getConclusionDate(), gameAnnotation.getPersonalNotes(), GameResponseDTO.parseGame(gameAnnotation.getGame()));
    }

}

package com.translucent.firegamesback.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true, nullable = false)
    private String email;

    @NotNull
    @Column(nullable = false)
    private String password;

    // Realizing relationship with MyGameAnnotation and ordering by conclusionDate
    @OneToMany(targetEntity = MyGameAnnotation.class)
    @OrderBy("conclusionDate DESC")
    private List<MyGameAnnotation> myGames;
}

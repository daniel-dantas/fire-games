package com.translucent.firegamesback.controller;

import com.translucent.firegamesback.dto.GameResponseDTO;
import com.translucent.firegamesback.dto.MyGameAnnotationResponseDTO;
import com.translucent.firegamesback.exceptions.NotFoundException;
import com.translucent.firegamesback.model.Game;
import com.translucent.firegamesback.model.MyGameAnnotation;
import com.translucent.firegamesback.model.User;
import com.translucent.firegamesback.repository.GameRepository;
import com.translucent.firegamesback.repository.MyGameAnnotationRepository;
import com.translucent.firegamesback.repository.UserRepository;
import com.translucent.firegamesback.validations.GameValidation;
import com.translucent.firegamesback.validations.MyGameAnnotationValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private MyGameAnnotationRepository myGameRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<GameResponseDTO> store (@RequestBody Game game) {
        GameValidation.validate(game);
        return new ResponseEntity<GameResponseDTO>(GameResponseDTO.parseGame(this.gameRepository.save(game)), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GameResponseDTO>> index () {

        List<GameResponseDTO> gamesResponse = new ArrayList<>();

        List<Game> games = this.gameRepository.findAll();

        for(Game game : games) {
            gamesResponse.add(GameResponseDTO.parseGame(game));
        }

        return new ResponseEntity<List<GameResponseDTO>>(gamesResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameResponseDTO> show (@PathVariable("id") Long id) {
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        Game game = this.gameRepository.findById(id).get();

        return new ResponseEntity<GameResponseDTO>(GameResponseDTO.parseGame(game), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@PathVariable("id") Long id){
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        this.gameRepository.deleteById(id);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update (@PathVariable("id") Long id, @RequestBody Game game) {
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        return gameRepository.findById(id).map(item -> {
            item = game;
            item.setId(id);
            Game updated = this.gameRepository.save(item);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/myLibrary/{id}/add")
    public ResponseEntity<MyGameAnnotationResponseDTO> addLibrary (@PathVariable("id") Long id, @RequestBody MyGameAnnotation myGame) {

        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        MyGameAnnotationValidation.validate(myGame);

        UserDetails userDetail = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = this.userRepository.getByEmail(userDetail.getUsername()).get();

        myGame.setGame(this.gameRepository.findById(id).get());

        MyGameAnnotation gameSaved = this.myGameRepository.save(myGame);

        user.getMyGames().add(gameSaved);

        this.userRepository.save(user);
        return new ResponseEntity<MyGameAnnotationResponseDTO>(MyGameAnnotationResponseDTO.parseGameAnnotation(gameSaved), HttpStatus.CREATED);

    }

    @GetMapping("/myLibrary")
    public ResponseEntity<List<MyGameAnnotationResponseDTO>> myLibrary (){

        UserDetails userDetail = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = this.userRepository.getByEmail(userDetail.getUsername()).get();

        List<MyGameAnnotationResponseDTO> myGamesResponse = new ArrayList<>();

        for(MyGameAnnotation game : user.getMyGames()) {
            myGamesResponse.add(MyGameAnnotationResponseDTO.parseGameAnnotation(game));
        }

        return new ResponseEntity<List<MyGameAnnotationResponseDTO>>(myGamesResponse, HttpStatus.OK);
    }

    @GetMapping("/myLibrary/{id}")
    public ResponseEntity<MyGameAnnotationResponseDTO> getMyAnnotation(@PathVariable("id") @Validated Long id) {
        if (!this.myGameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        return new ResponseEntity<MyGameAnnotationResponseDTO>(MyGameAnnotationResponseDTO.parseGameAnnotation(this.myGameRepository.findById(id).get()), HttpStatus.OK);
    }

    @PutMapping("/myLibrary/{id}")
    public ResponseEntity<MyGameAnnotationResponseDTO> editMyAnnotation (@PathVariable("id") Long id, @RequestBody MyGameAnnotation gameAnnotation) {
        if (!this.myGameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        return this.myGameRepository.findById(id).map(item -> {
            Game game = item.getGame();
            item = gameAnnotation;
            item.setId(id);
            item.setGame(game);
            return new ResponseEntity<MyGameAnnotationResponseDTO>(MyGameAnnotationResponseDTO.parseGameAnnotation(this.myGameRepository.save(item)), HttpStatus.OK);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/myLibrary/{id}")
    public ResponseEntity deleteMyAnnotation (@PathVariable("id") Long id) {
        if (!this.myGameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        UserDetails userDetail = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = this.userRepository.getByEmail(userDetail.getUsername()).get();

        MyGameAnnotation myGame = this.myGameRepository.findById(id).get();

        user.getMyGames().remove(myGame);

        this.userRepository.save(user);

        this.myGameRepository.deleteById(id);

        return new ResponseEntity(HttpStatus.OK);

    }

}

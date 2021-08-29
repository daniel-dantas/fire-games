package com.translucent.firegamesback.controller;

import com.translucent.firegamesback.exceptions.NotFoundException;
import com.translucent.firegamesback.model.Game;
import com.translucent.firegamesback.model.MyGameAnnotation;
import com.translucent.firegamesback.repository.GameRepository;
import com.translucent.firegamesback.repository.MyGameAnnotationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private MyGameAnnotationRepository myGameRepository;

    @PostMapping
    public ResponseEntity<Game> store (@RequestBody Game game) {
        return new ResponseEntity<Game>(this.gameRepository.save(game), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Game>> index () {
        return new ResponseEntity<List<Game>>(this.gameRepository.findAll(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> show (@PathVariable("id") Long id) {
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        Game game = this.gameRepository.findById(id).get();

        return new ResponseEntity<Game>(game, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@PathVariable("id") Long id){
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        this.gameRepository.deleteById(id);

        return new ResponseEntity( HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update (@PathVariable("id") Long id, @RequestBody Game game) {
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        return gameRepository.findById(id).map(item -> {
            item = game;
            item.setId(id);
            Game updated = gameRepository.save(item);
            return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/add")
    public ResponseEntity<MyGameAnnotation> addLibrary (@PathVariable("id") Long id, @RequestBody MyGameAnnotation myLibrary) {

        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        Game game = this.gameRepository.findById(id).get();

        myLibrary.setGame(game);

        return new ResponseEntity<MyGameAnnotation>(this.myGameRepository.save(myLibrary), HttpStatus.OK);

    }

    @GetMapping("/myLibrary")
    public ResponseEntity<?> myLibrary (){
        return new ResponseEntity<>(this.myGameRepository.findAll(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/myLibrary/{id}")
    public ResponseEntity<?> getMyAnnotation(@PathVariable("id") Long id) {
        if (!this.myGameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        return new ResponseEntity<>(this.myGameRepository.findById(id).get(), HttpStatus.ACCEPTED);
    }


}

package com.translucent.firegamesback.controller;

import com.translucent.firegamesback.exceptions.NotAttributeExistException;
import com.translucent.firegamesback.exceptions.NotFoundException;
import com.translucent.firegamesback.model.Game;
import com.translucent.firegamesback.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository repository;

    @PostMapping
    public ResponseEntity<Game> store (@RequestBody Game game) {
        return new ResponseEntity<Game>(this.repository.save(game), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Game>> index () {
        return new ResponseEntity<List<Game>>(this.repository.findAll(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> show (@PathVariable("id") Long id) {
        if (!this.repository.existsById(id)) throw new NotFoundException("There is no game with this id");
        Game game = this.repository.findById(id).get();

        return new ResponseEntity<Game>(game, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@PathVariable("id") Long id){
        if (!this.repository.existsById(id)) throw new NotFoundException("There is no game with this id");

        this.repository.deleteById(id);

        return new ResponseEntity( HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update (@PathVariable("id") Long id, @RequestBody Game game) {
        if (!this.repository.existsById(id)) throw new NotFoundException("There is no game with this id");
        return repository.findById(id).map(item -> {
            item = game;
            item.setId(id);
            Game updated = repository.save(item);
            return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
        }).orElse(ResponseEntity.notFound().build());
    }


}

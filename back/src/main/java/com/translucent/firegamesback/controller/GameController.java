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
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin (origins = "http://localhost:8081")
@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private MyGameAnnotationRepository myGameRepository;

    @Autowired
    private UserRepository userRepository;

    @ApiOperation("Route responsible for created a game")
    @ApiResponses({
            @ApiResponse(code = 201, message="Game created successfully"),
            @ApiResponse(code = 401, message = "Invalid token, request refused  ")
    })
    @PostMapping
    public ResponseEntity<GameResponseDTO> store (@RequestBody Game game) {
        GameValidation.validate(game);
        return new ResponseEntity<GameResponseDTO>(GameResponseDTO.parseGame(this.gameRepository.save(game)), HttpStatus.CREATED);
    }

    @ApiOperation("Route responsible for listing the games")
    @ApiResponses({
            @ApiResponse(code = 200, message="Games listed successfully"),
            @ApiResponse(code = 401, message = "Invalid token, request refused  ")
    })
    @GetMapping
    public ResponseEntity<List<GameResponseDTO>> index () {

        List<GameResponseDTO> gamesResponse = new ArrayList<>();

        List<Game> games = this.gameRepository.findAllByOrderByYearDesc();

        for(Game game : games) {
            gamesResponse.add(GameResponseDTO.parseGame(game));
        }

        return new ResponseEntity<List<GameResponseDTO>>(gamesResponse, HttpStatus.OK);
    }

    @ApiOperation("Route responsible for collecting data from a specific game")
    @ApiResponses({
            @ApiResponse(code = 200, message="Game data loaded successfully"),
            @ApiResponse(code = 401, message = "Invalid token, request refused "),
            @ApiResponse(code = 404, message = "No game with this id found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<GameResponseDTO> show (@ApiParam(value = "game id to be detailed", required = true) @PathVariable("id") Long id) {
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        Game game = this.gameRepository.findById(id).get();

        return new ResponseEntity<GameResponseDTO>(GameResponseDTO.parseGame(game), HttpStatus.OK);
    }

    @ApiOperation("Route responsible for deleting game data")
    @ApiResponses({
            @ApiResponse(code = 200, message="Game successfully deleted"),
            @ApiResponse(code = 401, message = "Invalid token, request refused"),
            @ApiResponse(code = 404, message = "No game with this id found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@ApiParam(value = "game id to be deleted", required = true) @PathVariable("id") Long id){
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        this.gameRepository.deleteById(id);

        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation("Responsible route update game data")
    @ApiResponses({
            @ApiResponse(code = 200, message="Game successfully updated"),
            @ApiResponse(code = 401, message = "Invalid token, request refused"),
            @ApiResponse(code = 404, message = "No game with this id found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> update (@ApiParam(value = "game id to be data updated", required = true) @PathVariable("id") Long id, @RequestBody Game game) {
        if (!this.gameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        return gameRepository.findById(id).map(item -> {
            item = game;
            item.setId(id);
            Game updated = this.gameRepository.save(item);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }).orElse(ResponseEntity.notFound().build());
    }

    @ApiOperation("Route responsible for adding a game to the user's library")
    @ApiResponses({
            @ApiResponse(code = 200, message="Games successfully listing"),
            @ApiResponse(code = 401, message = "Invalid token, request refused"),
            @ApiResponse(code = 404, message = "No game with this id found")
    })
    @PostMapping("/myLibrary/{id}/add")
    public ResponseEntity<MyGameAnnotationResponseDTO> addLibrary (@ApiParam(value = "game id", required = true) @PathVariable("id") Long id, @RequestBody MyGameAnnotation myGame) {

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
    @ApiOperation("Route responsible for listing games added to user library")
    @ApiResponses({
            @ApiResponse(code = 200, message="Games loaded successfully"),
            @ApiResponse(code = 401, message = "Invalid token, request refused"),
    })
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

    @ApiOperation("Route responsible for displaying data from a specific game in the user's library")
    @ApiResponses({
            @ApiResponse(code = 200, message="game data loaded successfully"),
            @ApiResponse(code = 401, message = "Invalid token, request refused"),
            @ApiResponse(code = 404, message = "No game with this id found")
    })
    @GetMapping("/myLibrary/{id}")
    public ResponseEntity<MyGameAnnotationResponseDTO> getMyAnnotation(@ApiParam(value = "game id", required = true) @PathVariable("id") @Validated Long id) {
        if (!this.myGameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");
        return new ResponseEntity<MyGameAnnotationResponseDTO>(MyGameAnnotationResponseDTO.parseGameAnnotation(this.myGameRepository.findById(id).get()), HttpStatus.OK);
    }
    @ApiOperation("Route responsible for updating user library game")
    @ApiResponses({
            @ApiResponse(code = 200, message="Game updated successfully"),
            @ApiResponse(code = 401, message = "Invalid token, request refused"),
            @ApiResponse(code = 404, message = "No game with this id found")
    })
    @PutMapping("/myLibrary/{id}")
    public ResponseEntity<MyGameAnnotationResponseDTO> editMyAnnotation (@ApiParam(value = "game id", required = true) @PathVariable("id") Long id, @RequestBody MyGameAnnotation gameAnnotation) {
        if (!this.myGameRepository.existsById(id)) throw new NotFoundException("There is no game with this id");

        return this.myGameRepository.findById(id).map(item -> {
            Game game = item.getGame();
            item = gameAnnotation;
            item.setId(id);
            item.setGame(game);
            return new ResponseEntity<MyGameAnnotationResponseDTO>(MyGameAnnotationResponseDTO.parseGameAnnotation(this.myGameRepository.save(item)), HttpStatus.OK);
        }).orElse(ResponseEntity.notFound().build());
    }

    @ApiOperation("Route responsible for removing a game from the user's library")
    @ApiResponses({
            @ApiResponse(code = 200, message="Game updated successfully"),
            @ApiResponse(code = 401, message = "Invalid token, request refused"),
            @ApiResponse(code = 404, message = "No game with this id found")
    })
    @DeleteMapping("/myLibrary/{id}")
    public ResponseEntity deleteMyAnnotation (@ApiParam(value = "game id", required = true) @PathVariable("id") Long id) {
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

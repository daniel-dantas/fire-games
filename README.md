# Fire Games

Fire games is a platform where users can register and make notes about games they've completed. It has its main page, a catalog with all the games that have already been registered on the platform, if the user needs to comment on a game that is not there, he can create one from scratch, and save his annotation, and the game template will be available for other users to use to make their notes. The user will be able to see their games with annotation on a page called "My Library", where they will also be able to delete and edit their annotations about the game.

## Technologies used

- React
- NextJS
- Firebase-Storage (Used to save game covers)
- Spring-boot
- PostgresSQL

## Developer Diary

Early in the development of the proposal, some challenges were encountered in the development of the backEnd that delayed the general development of the application. These challenges were:

- Lack of knowledge in Spring Boot;
- Learning curve for learning the framework;
- Difficulty understanding how spring security works;

Despite the difficulties in developing the back, everything was successfully implemented. The front felt like I was at home, so I had no development issues.

## Issues that were established throughout the development of the application

- [#1 Create main page with game listing](https://github.com/daniel-dantas/fire-games/issues/1)
- [#2 Create detail page and edit](https://github.com/daniel-dantas/fire-games/issues/2)
- [#3 Create login and registration page](https://github.com/daniel-dantas/fire-games/issues/3)
- [#4 Development application backend](https://github.com/daniel-dantas/fire-games/issues/5)
- [#5 FrontEnd integration with backEnd](https://github.com/daniel-dantas/fire-games/issues/6)
- [#6 Implement documentation with swagger on routes](https://github.com/daniel-dantas/fire-games/issues/7)
- [#7 Put applications to run in containers](https://github.com/daniel-dantas/fire-games/issues/12)

##

## Requirements to run the application

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/get-started/08_using_compose/)

## How to run the application

With bash in the root of the application run the command below

```
docker-compose up -d
```

## How to stop the application

With bash in the root of the application run the command below

```
docker-compose down
```

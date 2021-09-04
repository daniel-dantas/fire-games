import { NextPage } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../../components/GameCard";
import HeaderBar from "../../components/HeaderBar";
import { IMyGame } from "../../interfaces/IGame";
import IState from "../../interfaces/IState";
import { getMyGames } from "../../store/actions/games";

import styles from "./styles.module.scss";

const MyLibrary: NextPage = () => {
	const dispatch = useDispatch();

	const { myGames } = useSelector<IState, { myGames: IMyGame[] }>(
		state => state.games
	);

	useEffect(() => {
		dispatch(getMyGames());
	}, [dispatch]);

	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				{myGames.map((myGame, index) => (
					<GameCard key={index} my_game={myGame} type="GAME_MY_LIBRARY" />
				))}
			</div>
		</div>
	);
};

export default MyLibrary;

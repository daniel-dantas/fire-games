import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import GameCard from "../../components/GameCard";
import HeaderBar from "../../components/HeaderBar";
import { IMyGame } from "../../interfaces/IGame";
import IState from "../../interfaces/IState";

import styles from "./styles.module.scss";

const MyLibrary: NextPage = () => {
	const { myGames } = useSelector<IState, { myGames: IMyGame[] }>(
		state => state.game
	);

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

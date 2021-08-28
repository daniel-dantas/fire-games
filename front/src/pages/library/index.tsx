import { NextPage } from "next";
import React, { useState } from "react";
import GameCard from "../../components/GameCard";
import HeaderBar from "../../components/HeaderBar";
import styles from "./styles.module.scss";
import { Pagination } from "@material-ui/lab";
import IGame from "../../interfaces/IGame";
import { useSelector } from "react-redux";
import IState from "../../interfaces/IState";
// import { Container } from './styles';

const Library: NextPage = () => {
	const [gamesLibrary, setgamesLibrary] = useState<IGame[]>([]);

	const { games } = useSelector<IState, { games: IGame[] }>(
		state => state.game
	);

	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				{games.map((game, index) => (
					<GameCard key={index} game={game} />
				))}
			</div>
			<div className={styles.pagination_container}>
				{/* <Pagination count={2} shape="rounded" color="primary" /> */}
			</div>
		</div>
	);
};

export default Library;

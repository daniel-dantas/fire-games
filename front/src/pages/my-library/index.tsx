import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../../components/GameCard";
import HeaderBar from "../../components/HeaderBar";
import widthAuth from "../../hooks/widthAuth";
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
			<HeaderBar typeLoad="LOAD_MY_GAMES" />
			{myGames.length ? (
				<>
					<div className={styles.titleLibrary}>
						<h3>My Library</h3>
					</div>
					<div className={styles.container}>
						{myGames.map((myGame, index) => (
							<GameCard key={index} my_game={myGame} type="GAME_MY_LIBRARY" />
						))}
					</div>
				</>
			) : (
				<div className={styles.containerEmpty}>
					<h3>
						Your game library is empty! Add a game from the{" "}
						<Link href="/library">game library</Link> or register a new one from
						scratch in <Link href="/library/add">new game</Link>.
					</h3>
				</div>
			)}
		</div>
	);
};

export default MyLibrary;

export const getServerSideProps = widthAuth;

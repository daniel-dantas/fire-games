import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import HeaderBar from "../../components/HeaderBar";
import styles from "./styles.module.scss";
import { Pagination } from "@material-ui/lab";
import { IGame } from "../../interfaces/IGame";
import { useDispatch, useSelector } from "react-redux";
import IState from "../../interfaces/IState";
import { getGames } from "../../store/actions/games";
import { parseCookies } from "nookies";
import widthAuth from "../../hooks/widthAuth";
// import { Container } from './styles';

const Library: NextPage = () => {
	const dispatch = useDispatch();

	const { games } = useSelector<IState, { games: IGame[] }>(
		state => state.games
	);

	useEffect(() => {
		dispatch(getGames());
	}, [dispatch]);

	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				{games?.map((game, index) => (
					<GameCard key={index} game={game} type="GAME_LIBRARY" />
				))}
			</div>
		</div>
	);
};

export default Library;

export const getServerSideProps = widthAuth;

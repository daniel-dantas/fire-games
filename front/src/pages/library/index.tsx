import { NextPage } from "next";
import React from "react";
import GameCard from "../../components/GameCard";
import HeaderBar from "../../components/HeaderBar";
import styles from "./styles.module.scss";
// import { Container } from './styles';

const Library: NextPage = () => {
	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				<GameCard />
			</div>
		</div>
	);
};

export default Library;

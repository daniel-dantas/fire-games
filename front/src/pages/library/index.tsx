import { NextPage } from "next";
import React from "react";
import GameCard from "../../components/GameCard";
import HeaderBar from "../../components/HeaderBar";
import styles from "./styles.module.scss";
import { Pagination } from "@material-ui/lab";
// import { Container } from './styles';

const Library: NextPage = () => {
	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				<GameCard />
				<GameCard />
				<GameCard />
				<GameCard />
				<GameCard />
				<GameCard />
				<GameCard />
			</div>
			<div className={styles.pagination_container}>
				<Pagination count={2} shape="rounded" color="primary" />
			</div>
		</div>
	);
};

export default Library;

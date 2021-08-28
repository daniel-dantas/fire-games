import { NextPage } from "next";
import React from "react";
import HeaderBar from "../../../components/HeaderBar";

import styles from "./styles.module.scss";

const NewGame: NextPage = () => {
	return (
		<div className={styles.root}>
			<HeaderBar />
		</div>
	);
};

export default NewGame;

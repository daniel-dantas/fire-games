import React, { useCallback } from "react";
import Image from "next/image";

import styles from "./styles.module.scss";
import IGame from "../../interfaces/IGame";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

interface Props {
	game: IGame;
}

const GameCard: React.FC<Props> = ({ game }) => {
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/library/${game.id}/add`);
	}, [game]);

	return (
		<div className={styles.root} onClick={handleClick}>
			<Image src={game?.front_cover} alt="" width={100} height={100} />
			<div className={styles.content_info}>
				<h3>{game?.title}</h3>
				<span>Year: {game?.year}</span>
				<br />
				<div className={styles.badge_content}>
					<span className={styles.badge}>{game?.console}</span>
				</div>
			</div>
		</div>
	);
};

export default GameCard;

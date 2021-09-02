import React, { useCallback } from "react";
import Image from "next/image";

import styles from "./styles.module.scss";
import { IMyGame, IGame } from "../../interfaces/IGame";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

interface Props {
	game?: IGame;
	my_game?: IMyGame;
	type: "GAME_LIBRARY" | "GAME_MY_LIBRARY";
}

const GameCard: React.FC<Props> = ({ game, type, my_game }) => {
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push({
			pathname: `/library/add`,
			query:
				type === "GAME_LIBRARY"
					? {
							game: game?.id
					  }
					: {
							my_game: my_game?.game?.id
					  }
		});
	}, [game]);

	return (
		<div className={styles.root} onClick={handleClick}>
			<Image
				src={game ? game?.front_cover : my_game?.game?.front_cover + ""}
				alt=""
				width={100}
				height={100}
			/>
			<div className={styles.content_info}>
				<h3>{game ? game?.title : my_game?.game?.title}</h3>
				<span>Year: {game ? game?.year : my_game?.game?.year}</span>
				<br />
				<div className={styles.badge_content}>
					<span className={styles.badge}>
						{game ? game?.console : my_game?.game?.console}
					</span>
				</div>
			</div>
		</div>
	);
};

export default GameCard;

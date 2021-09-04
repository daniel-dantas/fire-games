import React, { useCallback } from "react";
import Image from "next/image";

import styles from "./styles.module.scss";
import { IMyGame, IGame } from "../../interfaces/IGame";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import Badge from "../Badge";

interface Props {
	game?: IGame;
	my_game?: IMyGame;
	type: "GAME_LIBRARY" | "GAME_MY_LIBRARY";
}

const GameCard: React.FC<Props> = ({ game, type, my_game }) => {
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(
			type === "GAME_LIBRARY"
				? {
						pathname: `/library/add`,
						query: {
							game: game?.id
						}
				  }
				: {
						pathname: `/my-library/${my_game?.id}/detail`
				  }
		);
	}, [game]);

	return (
		<div className={styles.root} onClick={handleClick}>
			<img
				src={game ? game?.front_cover : my_game?.game?.front_cover + ""}
				alt=""
			/>
			<div className={styles.content_info}>
				<h3>{game ? game?.title : my_game?.game?.title}</h3>
				<span>Year: {game ? game?.year : my_game?.game?.year}</span>
				<br />
				<div className={styles.badge_content}>
					<Badge>{game ? game?.console : my_game?.game?.console}</Badge>
					<Badge>{game ? game?.age : my_game?.game?.age} Years</Badge>

					{my_game && my_game.concluded && <Badge>Concluded</Badge>}
				</div>
			</div>
		</div>
	);
};

export default GameCard;

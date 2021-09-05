import React from "react";
import Downshift from "downshift";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import IState from "../../interfaces/IState";
import { IGame, IMyGame } from "../../interfaces/IGame";
import { useRouter } from "next/router";

const colors = [
	{ value: "white" },
	{ value: "black" },
	{ value: "red" },
	{ value: "orange" },
	{ value: "yellow" },
	{ value: "green" },
	{ value: "blue" },
	{ value: "cyan" },
	{ value: "purple" },
	{ value: "pink" }
];

interface Props {
	typeLoad: "LOAD_GAMES" | "LOAD_MY_GAMES";
}

const FormSearch: React.FC<Props> = ({ typeLoad }) => {
	const router = useRouter();

	const { games, myGames } = useSelector<
		IState,
		{ games: IGame[]; myGames: IMyGame[] }
	>(state => state.games);

	const gamesSearch =
		typeLoad === "LOAD_GAMES" ? games : myGames.map(myGame => myGame.game);

	const handleSearch = async (game: IGame) => {
		console.log(game);

		if (typeLoad === "LOAD_GAMES")
			await router.push({
				pathname: "/library/add",
				query: {
					game: game.id
				}
			});
		else
			await router.push({
				pathname: "/library/add",
				query: {
					my_game: game.id
				}
			});
	};

	return (
		<Downshift
			onChange={selected => handleSearch(selected)}
			itemToString={item => (item ? item.title : "")}
		>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				inputValue,
				highlightedIndex,
				selectedItem,
				getRootProps
			}) => (
				<div className={styles.root}>
					<div className={styles.containerSearch}>
						<input {...getInputProps()} placeholder="Find game" />
					</div>
					<div className={styles.containerResult}>
						<ul {...getMenuProps()}>
							{isOpen
								? gamesSearch
										.filter(
											item => !inputValue || item.title.includes(inputValue)
										)
										.map((item, index) => (
											// eslint-disable-next-line react/jsx-key
											<li
												{...getItemProps({
													key: item.title,
													index,
													item,
													style: {
														fontWeight:
															selectedItem === item ? "bold" : "normal",
														cursor: "pointer"
													}
												})}
											>
												{`${item.title} (${item.year}) - ${item.console}`}
											</li>
										))
								: null}
						</ul>
					</div>
				</div>
			)}
		</Downshift>
	);
};

export default FormSearch;

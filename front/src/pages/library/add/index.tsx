import { CKEditor } from "ckeditor4-react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../../components/HeaderBar";
import { FaImage } from "react-icons/fa";
import styles from "./styles.module.scss";
import Button from "../../../components/Button";
import { useFormik } from "formik";
import { EConsole, IGame, IMyGame } from "../../../interfaces/IGame";
import { useCallback } from "react";
import Image from "next/image";
import { ChangeEvent } from "react";
import * as yup from "yup";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
	addMyGame,
	getGame,
	getMyGame,
	saveGame,
	updateMyGame
} from "../../../store/actions/games";
import IState from "../../../interfaces/IState";
import IError from "../../../interfaces/IError";
import { useRouter } from "next/router";
interface Props {
	game_id?: string;
	my_game_id?: string;
}

const AddGame: NextPage<Props> = ({ game_id, my_game_id }) => {
	const [frontCoverFile, setFrontCoverFile] = useState<any>(null);
	const [consoles, setConsoles] = useState<string[]>([]);

	const dispatch = useDispatch();
	const router = useRouter();

	const { game, myGame } = useSelector<
		IState,
		{ game: IGame; myGame: IMyGame }
	>(state => state.games);

	const myForm = useFormik({
		initialValues: {
			id: my_game_id ? Number(my_game_id) : null,
			concluded: true,
			conclusionDate: "",
			game: {
				id: game_id ? Number(game_id) : null,
				console: "PC",
				front_cover: "",
				year: "",
				title: ""
			},
			personalNotes: ""
		},
		validationSchema: yup.object().shape({
			// "game.title": yup
			// 	.string()
			// 	.required("You need to fill in the title of the game")
			// 	.max(100, "Title cannot exceed 100 characters"),
			// "game.year": yup
			// 	.number()
			// 	.required("You need to fill in the game year")
			// 	.max(new Date().getFullYear())
			// 	.min(1970, "The game cannot be older than 1970")
			// 	.typeError("Invalid year format")
		}),
		onSubmit: async (values, helpers) => {
			if (my_game_id) {
				dispatch(
					updateMyGame(values as any, (err: IError) => {
						router.push("/my-library");
					})
				);
			} else if (game_id) {
				dispatch(addMyGame(game_id as any, values as any));
			} else {
				dispatch(
					saveGame(values.game as any, (err: IError, gameId: number) => {
						if (gameId) {
							dispatch(
								addMyGame(gameId as number, values as any, (err: IError) => {
									router.push("/my-library");
								})
							);
						}
					})
				);
			}
		}
	});

	useEffect(() => {
		if (game?.id && game_id) {
			myForm.setFieldValue("game", game);
			setFrontCoverFile(game.front_cover);
		} else if (myGame?.id && my_game_id) {
			myForm.setValues(myGame as any);
			setFrontCoverFile(myGame.game.front_cover);
		}
	}, [game, myGame]);

	useEffect(() => {
		if (my_game_id) {
			dispatch(getMyGame(my_game_id));
		} else if (game_id) {
			dispatch(getGame(Number(game_id)));
		}
	}, [my_game_id, game_id]);

	const handleUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const reader = new FileReader();
			const url = reader.readAsDataURL(e.target.files[0]);

			reader.onload = e => {
				setFrontCoverFile(reader.result);
				// myForm.setFieldValue("game.front_cover", reader.result);
			};
		}
	}, []);

	useEffect(() => {
		let consoles: string[] = [];

		Object.keys(EConsole).map(key => {
			consoles.push(key);
		});

		setConsoles(consoles);
	}, []);

	useEffect(() => {
		console.log("GAME ID");
		console.log(game_id);
	}, [game_id]);

	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				<form onSubmit={myForm.handleSubmit}>
					<div className={styles.formContent}>
						<div className={styles.containerUpload}>
							{frontCoverFile ? (
								<img
									className={styles.frontCover}
									src={frontCoverFile}
									alt=""
									onClick={e =>
										!Boolean(game_id) &&
										!Boolean(my_game_id) &&
										setFrontCoverFile(null)
									}
								/>
							) : (
								<label htmlFor="front-cover">
									<div className={styles.imageButton}>
										<span>Front Cover</span>
										<FaImage />
									</div>
									<input id="front-cover" type="file" onChange={handleUpload} />
								</label>
							)}
						</div>
						<div className={styles.containerInputs}>
							<div className={styles.inputGroupOne}>
								<input
									placeholder="Title"
									type="text"
									disabled={Boolean(game_id) || Boolean(my_game_id)}
									{...myForm.getFieldProps("game.title")}
								/>
							</div>
							<div className={styles.inputGroupTwo}>
								<input
									placeholder="Year"
									type="text"
									disabled={Boolean(game_id) || Boolean(my_game_id)}
									{...myForm.getFieldProps("game.year")}
								/>
								<select
									defaultValue="PC"
									{...myForm.getFieldProps("game.console")}
									disabled={Boolean(game_id) || Boolean(my_game_id)}
								>
									{consoles.map(console => (
										<option key={console}>{console}</option>
									))}
								</select>
							</div>
							<div className={styles.inputGroupTwo}>
								<label className={styles.concluded} htmlFor="concluded">
									<input
										type="checkbox"
										id="concluded"
										checked={myForm.values.concluded}
										onChange={e =>
											myForm.setFieldValue("concluded", e.target.checked)
										}
										// {...myForm.getFieldProps("concluded")}
									/>
									<span>Concluded game?</span>
								</label>
								<input
									placeholder="Date of the conclusion"
									type="date"
									{...myForm.getFieldProps("conclusionDate")}
								/>
							</div>
							<div className={styles.inputCkEditor}>
								<h3 className={styles.personalLabel}>Personal Notes</h3>
								<CKEditor
									data={myForm.values.personalNotes}
									onChange={(editor: any) =>
										myForm.setFieldValue(
											"personalNotes",
											editor.editor.getData()
										)
									}
									config={{
										title: `description`,
										language: "en",
										toolbar: [
											{
												name: "styles",
												items: ["Format", "Font", "FontSize"]
											},
											{ name: "links", items: ["Link"] },

											{
												name: "basicstyles",
												items: ["Bold", "Italic", "Strike", ,]
											},
											{
												name: "paragraph",
												items: ["NumberedList", "BulletedList"]
											},
											{ name: "personal notes", items: ["persona notes"] }
										]
									}}
								/>
							</div>
						</div>
					</div>
					<div className={styles.operationsForm}>
						<Button type="reset" styleType="Outlined">
							Cancel
						</Button>
						<Button type="submit" styleType="Primary">
							Save
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

(AddGame as NextPage).getInitialProps = ({ query }) => {
	return { game_id: query.game, my_game_id: query.my_game };
};

export default AddGame;

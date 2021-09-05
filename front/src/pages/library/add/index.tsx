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
import { CKEditor } from "ckeditor4-react";
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
import widthAuth from "../../../hooks/widthAuth";
import Storage from "../../../services/storage";
import { toast } from "react-toastify";
interface Props {
	game?: string;
	my_game?: string;
}

const AddGame: NextPage<Props> = ({ game: game_id, my_game: my_game_id }) => {
	const [frontCoverFile, setFrontCoverFile] = useState<any>(null);
	const [consoles, setConsoles] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const router = useRouter();

	const { game, myGame } = useSelector<
		IState,
		{ game: IGame; myGame: IMyGame }
	>(state => state.games);

	const myForm = useFormik({
		initialValues: {
			id: my_game_id ? Number(my_game_id) : null,
			concluded: false,
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
			conclusionDate: yup.date().max(new Date(), "Cannot use future dates"),
			game: yup.object().shape({
				title: yup
					.string()
					.required("Game title is required")
					.max(100, "Title cannot exceed 100 characters"),
				year: yup
					.number()
					.required("Game year is required")
					.max(new Date().getFullYear(), "The year must be below 2021")
					.min(1970, "The year must be above 1970")
					.typeError("Invalid year format")
			})
		}),
		onSubmit: async (values, helpers) => {
			if (my_game_id) {
				dispatch(
					updateMyGame(values as any, (err: IError) => {
						toast.success("Game updated successfully!");
						router.push("/my-library");
					})
				);
			} else if (game_id) {
				dispatch(
					addMyGame(game_id as any, values as any, (err: IError) => {
						toast.success("Game added to your library!");
						router.push("/my-library");
					})
				);
			} else {
				setLoading(true);
				dispatch(
					saveGame(values.game as any, (err: IError, gameId: number) => {
						if (gameId) {
							dispatch(
								addMyGame(gameId as number, values as any, (err: IError) => {
									toast.success("Game added to your library!");
									router.push("/my-library");
									setLoading(false);
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
			reader.onload = async e => {
				setFrontCoverFile(reader.result);
			};
			myForm.setFieldValue("game.front_cover", e.target.files[0]);
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

	return !loading ? (
		<div className={styles.root}>
			<HeaderBar typeLoad="LOAD_GAMES" />
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
								{myForm.touched.game?.title && myForm.errors.game?.title && (
									<div className={styles.errorForm}>
										<span>* {myForm.errors.game?.title}</span>
									</div>
								)}
							</div>
							<div className={styles.inputGroupTwo}>
								<div>
									<input
										placeholder="Year"
										type="text"
										disabled={Boolean(game_id) || Boolean(my_game_id)}
										{...myForm.getFieldProps("game.year")}
									/>
								</div>

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
							{myForm.touched.game?.year && myForm.errors.game?.year && (
								<div className={styles.errorForm}>
									<span>* {myForm.errors.game?.year}</span>
								</div>
							)}
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
								<div>
									<input
										placeholder="Date of the conclusion"
										type="date"
										{...myForm.getFieldProps("conclusionDate")}
									/>
									{myForm.touched.conclusionDate &&
										myForm.errors.conclusionDate && (
											<div className={styles.errorForm}>
												<span>* {myForm.errors.conclusionDate}</span>
											</div>
										)}
								</div>
							</div>
							<div className={styles.inputCkEditor}>
								<h3 className={styles.personalLabel}>Personal Notes</h3>
								<CKEditor
									name="personalNotes"
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
	) : (
		<></>
	);
};

export default AddGame;

export const getServerSideProps = widthAuth;

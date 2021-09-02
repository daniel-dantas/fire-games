import { CKEditor } from "ckeditor4-react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../../components/HeaderBar";
import { FaImage } from "react-icons/fa";
import styles from "./styles.module.scss";
import Button from "../../../components/Button";
import { useFormik } from "formik";
import { EConsole, IMyGame } from "../../../interfaces/IGame";
import { useCallback } from "react";
import Image from "next/image";
import { ChangeEvent } from "react";

interface Props {
	game_id?: string;
	my_game_id?: string;
}

const AddGame: NextPage<Props> = ({ game_id, my_game_id }) => {
	const [frontCoverFile, setFrontCoverFile] = useState<any>(null);
	const [consoles, setConsoles] = useState<string[]>([]);

	const myForm = useFormik({
		initialValues: {
			id: my_game_id ? Number(my_game_id) : null,
			concluded: "",
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
		onSubmit: (values, helpers) => {
			console.log("VALUES");
			console.log(values);
		}
	});

	const handleUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const reader = new FileReader();
			const url = reader.readAsDataURL(e.target.files[0]);

			reader.onload = e => {
				setFrontCoverFile(reader.result);
			};
		}
	}, []);

	useEffect(() => {
		console.log("LISTA");
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
									width={300}
									height={500}
									onClick={e => setFrontCoverFile(null)}
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
									{...myForm.getFieldProps("game.title")}
								/>
							</div>
							<div className={styles.inputGroupTwo}>
								<input
									placeholder="Year"
									type="text"
									{...myForm.getFieldProps("game.year")}
								/>
								<select
									defaultValue="PC"
									{...myForm.getFieldProps("game.console")}
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
										{...myForm.getFieldProps("concluded")}
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
									onChange={editor =>
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

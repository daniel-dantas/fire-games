import { CKEditor } from "ckeditor4-react";
import { NextPage } from "next";
import React, { useEffect } from "react";
import HeaderBar from "../../../components/HeaderBar";
import { FaImage } from "react-icons/fa";
import styles from "./styles.module.scss";

interface Props {
	game_id?: string;
}

const AddGame: NextPage<Props> = ({ game_id }) => {
	useEffect(() => {
		console.log("GAME ID");
		console.log(game_id);
	}, [game_id]);

	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				<form>
					<div className={styles.formContent}>
						<div className={styles.containerUpload}>
							<label htmlFor="front-cover">
								<div className={styles.imageButton}>
									<span>Front Cover</span>
									<FaImage />
								</div>
								<input id="front-cover" type="file" />
							</label>
						</div>
						<div className={styles.containerInputs}>
							<div className={styles.inputGroupOne}>
								<input placeholder="Title" type="text" />
							</div>
							<div className={styles.inputGroupTwo}>
								<input placeholder="Year" type="text" />
								<select defaultValue="PC">
									<option>PC</option>
									<option>XBOX 360</option>
								</select>
							</div>
							<div className={styles.inputGroupTwo}>
								<label className={styles.concluded} htmlFor="concluded">
									<input type="checkbox" id="concluded" />
									<span>Concluded game?</span>
								</label>
								<input placeholder="Date of the conclusion" type="date" />
							</div>
							<div className={styles.inputCkEditor}>
								<h3 className={styles.personalLabel}>Personal Notes</h3>
								<CKEditor
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
						<button type="reset">Cancel</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</div>
		</div>
	);
};

(AddGame as NextPage).getInitialProps = ({ query }) => {
	return { game_id: query.game };
};

export default AddGame;

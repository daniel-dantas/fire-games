import { CKEditor } from "ckeditor4-react";
import moment from "moment";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { FaEdit, FaImage, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import HeaderBar from "../../../../components/HeaderBar";
import { IMyGame } from "../../../../interfaces/IGame";
import IState from "../../../../interfaces/IState";
import Image from "next/image";

import styles from "./styles.module.scss";
import Badge from "../../../../components/Badge";
import Button from "../../../../components/Button";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import { deleteMygame, getMyGame } from "../../../../store/actions/games";
import Swal from "sweetalert2";
import IError from "../../../../interfaces/IError";
import { toast } from "react-toastify";
import widthAuth from "../../../../hooks/widthAuth";

const Detail: NextPage = () => {
	const router = useRouter();

	const dispatch = useDispatch();

	const myGameId = router.query.id;

	const { myGame } = useSelector<IState, { myGame: IMyGame }>(
		state => state.games
	);

	const handleEdit = () => {
		router.push({
			pathname: "/library/add",
			query: {
				my_game: myGame.id
			}
		});
	};

	const handleDelete = async () => {
		await Swal.fire({
			title: "Attention",
			icon: "info",
			html: "Are you sure you want to delete this game?",

			showCancelButton: true,
			cancelButtonText: "BACK",
			confirmButtonText: "DELETE",
			confirmButtonColor: "#4CC3EE",
			showLoaderOnConfirm: true,
			preConfirm: async () => {
				dispatch(
					deleteMygame(myGameId as string, (err: IError) => {
						toast.success("Game successfully removed from library");
						router.push("/my-library");
					})
				);
			}
		});
	};

	useEffect(() => {
		if (myGameId) {
			dispatch(getMyGame(myGameId as string));
		}
	}, [dispatch, myGameId]);

	return (
		<div className={styles.root}>
			<HeaderBar />
			<div className={styles.container}>
				<div className={styles.detailContainer}>
					<div className={styles.formContent}>
						<div className={styles.containerUpload}>
							<img
								className={styles.frontCover}
								src={myGame?.game?.front_cover}
								alt=""
								width={300}
								height={500}
							/>
						</div>
						<div className={styles.containerInputs}>
							<div className={styles.titleContainer}>
								<h3>
									{myGame?.game?.title} ({myGame?.game?.year}){" "}
									{myGame?.concluded && " - Concluided"}
								</h3>
								<div className={styles.operationsGame}>
									<Button styleType="Outlined" onClick={handleEdit}>
										<FaEdit />
									</Button>
									<Button styleType="Primary" onClick={handleDelete}>
										<FaTrashAlt />
									</Button>
								</div>
							</div>
							{myGame?.conclusionDate && (
								<div className={styles.inputGroupOne}>
									<h4>
										Conclusion:{" "}
										{moment(myGame.conclusionDate).format("YYYY-MM-DD")}
									</h4>
								</div>
							)}
							<div className={styles.sectionBadges}>
								<Badge>{myGame?.game?.console}</Badge>
								<Badge>{myGame?.game?.age + " Years"}</Badge>
							</div>
							{myGame.personalNotes && (
								<div className={styles.sectionPersonalNotes}>
									<h3 className={styles.personalLabel}>Personal Notes</h3>
									<span
										dangerouslySetInnerHTML={{ __html: myGame.personalNotes }}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Detail;

export const getServerSideProps = widthAuth;

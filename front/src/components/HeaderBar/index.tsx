import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/account";
import { useRouter } from "next/router";

const HeaderBar: React.FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogout = () => {
		dispatch(logout());
		router.reload();
	};

	return (
		<nav className={styles.header}>
			<div className={styles.content_logo}>
				<Image src="/images/logo_2.svg" alt="teste" width={250} height={70} />
			</div>
			<form className={styles.content_search}>
				<input placeholder="Find Game" />
			</form>
			<div className={styles.content_links}>
				<Link href="/library">Library</Link>
				<Link href="/library/add">New Game</Link>
				<Link href="/my-library">My Library</Link>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</nav>
	);
};

export default HeaderBar;

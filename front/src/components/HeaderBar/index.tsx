import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

const HeaderBar: React.FC = () => {
	return (
		<nav className={styles.header}>
			<div className={styles.content_logo}>
				<Image src="/images/logo_2.svg" alt="teste" width={250} height={70} />
			</div>
			<div className={styles.content_search}>
				<input placeholder="Find Game" />
			</div>
			<div className={styles.content_links}>
				<Link href="/library">Library</Link>
				<Link href="/library/add">New Game</Link>
				<Link href="/my-library">My Library</Link>
				<button>Logout</button>
			</div>
		</nav>
	);
};

export default HeaderBar;

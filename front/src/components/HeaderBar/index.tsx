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
				<input placeholder="Find Game" type="text" />
			</div>
			<div className={styles.content_links}>
				<Link href={"#"}>New Game</Link>
				<Link href={"#"}>My Library</Link>
				<button>Logout</button>
			</div>
		</nav>
	);
};

export default HeaderBar;

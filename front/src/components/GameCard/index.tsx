import React from "react";
import Image from "next/image";

import styles from "./styles.module.scss";

const GameCard: React.FC = () => {
	return (
		<div className={styles.root}>
			<Image src="/images/wd-xbox360.jpg" alt="" width={100} height={100} />
			<div className={styles.content_info}>
				<h3>Call Of duty</h3>
				<span>Ano: 2021</span>
				<br />
				<div className={styles.badge_content}>
					<span className={styles.badge}>XBOX 360</span>
					<span className={styles.badge}>Concluded</span>
				</div>
			</div>
		</div>
	);
};

export default GameCard;

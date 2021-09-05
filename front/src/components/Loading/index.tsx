import React from "react";

import styles from "./styles.module.scss";

const Loading: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.loader} />
		</div>
	);
};

export default Loading;

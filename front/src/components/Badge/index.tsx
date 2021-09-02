import React from "react";

import styles from "./styles.module.scss";

interface Props {
	color: "secondary" | "primary";
}

const Badge: React.FC = ({ children }) => {
	return <span className={styles.badge}>{children}</span>;
};

export default Badge;

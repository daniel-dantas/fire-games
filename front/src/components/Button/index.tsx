import React from "react";

import styles from "./styles.module.scss";

interface Props
	extends Omit<
		React.DetailedHTMLProps<
			React.InputHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		"onChange"
	> {
	styleType: "Primary" | "Outlined";
}

const Button: React.FC<Props> = ({ styleType, children, ...rest }) => (
	<button
		{...rest}
		className={
			styleType === "Primary" ? styles.buttonPrimary : styles.buttonOutlined
		}
	>
		{children}
	</button>
);

export default Button;

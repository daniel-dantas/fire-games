import { style } from "@material-ui/system";
import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Button from "../../components/Button";

import styles from "./styles.module.scss";

const Home: NextPage = () => {
	const router = useRouter();

	const registerForm = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: ""
		},
		onSubmit: values => {
			router.push("/");
		}
	});

	const handleLogin = useCallback(() => {}, []);

	return (
		<div className={styles.root}>
			<div className={styles.containerBlue}>
				<div className={styles.containerAnimetedText}>
					<h3>
						Create a fire games account and save data from the games you
						complete!
					</h3>
				</div>
			</div>
			<div className={styles.containerBlueRotate} />
			<div className={styles.containerWhiteRotate}>
				<form onSubmit={registerForm.handleSubmit}>
					<h3>Register</h3>

					<input
						type="email"
						placeholder="Email"
						{...registerForm.getFieldProps("email")}
					/>

					<input
						type="password"
						placeholder="Password"
						{...registerForm.getFieldProps("password")}
					/>

					<input
						type="password"
						placeholder="Confirm to password"
						{...registerForm.getFieldProps("confirmPassword")}
					/>

					<Button styleType="Primary" type="submit">
						Register
					</Button>
					<hr />
					<Button
						styleType="Primary"
						type="button"
						onClick={e => router.push("/")}
					>
						Back to Login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Home;

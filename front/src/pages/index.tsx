import { style } from "@material-ui/system";
import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Button from "../components/Button";

import styles from "./styles.module.scss";

const Home: NextPage = () => {
	const router = useRouter();

	const loginForm = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		onSubmit: values => {
			router.push("/library");
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
				<form onSubmit={loginForm.handleSubmit}>
					<h3>Login</h3>

					<input
						type="email"
						placeholder="Email"
						{...loginForm.getFieldProps("email")}
					/>
					<input
						type="password"
						placeholder="Password"
						{...loginForm.getFieldProps("password")}
					/>

					<Button styleType="Primary" type="submit">
						Login
					</Button>

					<hr />

					<Button
						styleType="Primary"
						type="button"
						onClick={e => router.push("register")}
					>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Home;

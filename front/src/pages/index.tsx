import { style } from "@material-ui/system";
import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/Button";
import IError from "../interfaces/IError";
import { submitLogin } from "../store/actions/account";
import * as yup from "yup";

import styles from "./styles.module.scss";

const Home: NextPage = () => {
	const router = useRouter();

	const [failed, setFailed] = useState();

	const dispatch = useDispatch();

	const loginForm = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: yup.object().shape({
			email: yup.string().required("You need to fill in the email"),
			password: yup
				.string()
				.required("You need to fill in the passwords")
				.min(6, "Password must be longer than 6 characters")
		}),
		onSubmit: values => {
			dispatch(
				submitLogin(values, async (err: IError) => {
					if (err && err.unauthorized) {
						await toast.error(err.unauthorized);
					} else {
						router.push("/library");
					}
				})
			);
		}
	});

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
						required
						{...loginForm.getFieldProps("email")}
					/>
					{loginForm.touched.email && loginForm.errors.email && (
						<div className={styles.errorForm}>
							<span>* {loginForm.errors.email}</span>
						</div>
					)}
					<input
						type="password"
						placeholder="Password"
						required
						{...loginForm.getFieldProps("password")}
					/>
					{loginForm.touched.password && loginForm.errors.password && (
						<div className={styles.errorForm}>
							<span>* {loginForm.errors.password}</span>
						</div>
					)}

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

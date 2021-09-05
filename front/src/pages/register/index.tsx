import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Button from "../../components/Button";

import styles from "./styles.module.scss";

import * as yup from "yup";
import { useDispatch } from "react-redux";
import { submitRegister } from "../../store/actions/account";
import IError from "../../interfaces/IError";
import { toast } from "react-toastify";

const Home: NextPage = () => {
	const router = useRouter();

	const dispatch = useDispatch();

	const registerForm = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: ""
		},
		validationSchema: yup.object().shape({
			email: yup.string().required("You need to fill in the email"),
			password: yup
				.string()
				.required("You need to fill in the passwords")
				.min(6, "Password must be longer than 6 characters"),
			confirmPassword: yup
				.string()
				.required("You need to enter password confirmation")
				.oneOf([yup.ref("password"), null], "Passwords must match")
		}),
		onSubmit: values => {
			dispatch(
				submitRegister(values, (err: IError) => {
					if (err && err?.conflict) {
						toast.error(err.conflict);
						registerForm.setFieldError("email", err.conflict);
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
				<form onSubmit={registerForm.handleSubmit}>
					<h3>Register</h3>

					<input
						type="email"
						placeholder="Email"
						{...registerForm.getFieldProps("email")}
						required
					/>
					{registerForm.touched.email && registerForm.errors.email && (
						<div className={styles.errorForm}>
							<span>* {registerForm.errors.email}</span>
						</div>
					)}

					<input
						type="password"
						placeholder="Password"
						{...registerForm.getFieldProps("password")}
						required
					/>
					{registerForm.touched.password && registerForm.errors.password && (
						<div className={styles.errorForm}>
							<span>* {registerForm.errors.password}</span>
						</div>
					)}
					<input
						type="password"
						placeholder="Confirm to password"
						{...registerForm.getFieldProps("confirmPassword")}
						required
					/>
					{registerForm.touched.confirmPassword &&
						registerForm.errors.confirmPassword && (
							<div className={styles.errorForm}>
								<span>* {registerForm.errors.confirmPassword}</span>
							</div>
						)}

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

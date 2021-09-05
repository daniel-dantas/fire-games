import { Dispatch } from "redux";
import { ILogin } from "../../../interfaces/IAccount";
import IError from "../../../interfaces/IError";
import Api from "../../../services/api";

export const SUBMIT_LOGIN = "[ACCOUNT] SUBMIT_LOGIN";
export const SUBMIT_REGISTER = "[ACCOUNT] SUBMIT_REGISTER";
export const LOGOUT = "[ACCOUNT] LOGOUT";

export function submitLogin(loginData: ILogin, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		try {
			const response = await Api.post("/auth", loginData);
			const result = response.data;

			dispatch({
				type: SUBMIT_LOGIN,
				payload: result
			});

			return callback && callback();
		} catch (err) {
			let error: IError = {};

			if (err.response.status === 401) {
				error.unauthorized = "Incorrect email or password";
			}

			return callback && callback(error);
		}
	};
}

export function submitRegister(registerData: ILogin, callback?: Function) {
	return async (dispatch: Function, getState: Function) => {
		try {
			const response = await Api.post("/user/register", registerData);

			const result = await response.data;

			dispatch({
				type: SUBMIT_REGISTER,
				payload: result
			});

			dispatch(submitLogin(registerData));

			return callback && callback(null);
		} catch (err) {
			let error: IError = {};

			if (err.response.status === 409) {
				error.conflict = "There is already an account with this email";
			}

			return callback && callback(error);
		}
	};
}

export function logout() {
	return async (dispatch: Dispatch, getState: Function) => {
		dispatch({ type: LOGOUT });
	};
}

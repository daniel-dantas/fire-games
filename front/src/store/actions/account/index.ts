import { Dispatch } from "redux";
import { ILogin } from "../../../interfaces/IAccount";
import IError from "../../../interfaces/IError";
import Api from "../../../services/api";

export const SUBMIT_LOGIN = "[ACCOUNT] SUBMIT_LOGIN";
export const SUBMIT_LOGIN_SUCCESS = "[ACCOUNT] SUBMIT_LOGIN";
export const SUBMIT_LOGIN_FAILED = "[ACCOUNT] SUBMIT_LOGIN_FAILED";

export const SUBMIT_REGISTER = "[ACCOUNT] SUBMIT_REGISTER";
export const SUBMIT_REGISTER_SUCCESS = "[ACCOUNT] SUBMIT_REGISTER_SUCCESS";
export const SUBMIT_REGISTER_FAILED = "[ACCOUNT] SUBMIT_REGISTER_FAILED";

export function submitLogin(loginData: ILogin, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		try {
			const response = await Api.post("/auth", loginData);

			if (response.status === 200) {
				const result = response.data;

				dispatch({
					type: SUBMIT_LOGIN,
					payload: result
				});

				return callback && callback();
			} else {
				const error: IError = {};

				if (response.status === 401) {
					error.unauthorized = "Incorrect email or password";
				}

				return callback && callback(error);
			}
		} catch (err) {
			return callback && callback(err);
		}
	};
}

export function submitRegister(registerData: ILogin, callback?: Function) {
	return async (dispatch: Function, getState: Function) => {
		try {
			const response = await Api.post("/user/register", registerData);

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: SUBMIT_REGISTER,
					payload: result
				});

				dispatch(submitLogin(registerData));

				return callback && callback(null);
			} else {
				const error: IError = {};

				if (response.status === 409) {
					error.conflict = "There is already an account with this email";
				}

				return callback && callback(error);
			}
		} catch (err) {
			return callback && callback(err);
		}
	};
}

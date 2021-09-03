import { Dispatch } from "redux";
import { ILogin } from "../../../interfaces/IAccount";
import IError from "../../../interfaces/IError";
import * as Api from "../../../services/api";

export const SUBMIT_LOGIN = "[ACCOUNT] SUBMIT_LOGIN";
export const SUBMIT_LOGIN_SUCCESS = "[ACCOUNT] SUBMIT_LOGIN";
export const SUBMIT_LOGIN_FAILED = "[ACCOUNT] SUBMIT_LOGIN_FAILED";

export function submitLogin(loginData: ILogin, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		dispatch({ type: SUBMIT_LOGIN });

		try {
			const response = await Api.sendPost("/auth", loginData);

			console.log("RESPONSE");
			console.log(response.status);

			if (response.status === 200) {
				const result = await response.json();

				console.log("RESULT");
				console.log(result);

				dispatch({
					type: SUBMIT_LOGIN_SUCCESS,
					payload: result
				});

				return callback && callback();
			} else {
				const error: IError = {};

				if (response.status === 401) {
					error.unauthorized = "Incorrect email or password";
				}

				dispatch({
					type: SUBMIT_LOGIN_FAILED
				});

				return callback && callback(error);
			}
		} catch (err) {
			dispatch({
				type: SUBMIT_LOGIN_FAILED
			});

			return callback && callback(err);
		}
	};
}

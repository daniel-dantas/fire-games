import { Dispatch } from "redux";
import IError from "../../../interfaces/IError";
import Api from "../../../services/api";

export const GET_GAMES = "[GAME] GET_GAMES";
export const GET_GAMES_SUCCESS = "[GAME] GET_GAMES";
export const GET_GAMES_FAILED = "[GAME] GET_GAMES_FAILED";

export function getGames(callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		const { token } = getState().account;

		try {
			const response = await Api.get("/games", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: GET_GAMES,
					payload: result
				});

				return callback && callback();
			} else {
				const error: IError = {};

				if (response.status === 401) {
					// logout
				}

				return callback && callback(error);
			}
		} catch (err) {
			return callback && callback(err);
		}
	};
}

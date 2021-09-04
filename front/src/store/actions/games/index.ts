import { Dispatch } from "redux";
import IError from "../../../interfaces/IError";
import { IGame } from "../../../interfaces/IGame";
import Api from "../../../services/api";

export const GET_GAMES = "[GAME] GET_GAMES";
export const GET_GAME = "[GAME] GET_GAME";
export const SAVE_GAME = "[GAME] SAVE_GAME";
export const ADD_MY_GAME = "[GAME] ADD_MY_GAME";
export const GET_MY_GAMES = "[GAME] GET_MY_GAMES";
export const GET_MY_GAME = "[GAME] GET_MY_GAME";

export function getGames(callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		const { token } = getState().account;

		try {
			console.log("TOKEN");
			console.log(token);

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

export function getGame(gameId: number, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		try {
			const { token } = getState().account;

			console.log("TOKEN");
			console.log(token);

			const response = await Api.get(`/games/${gameId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: GET_GAME,
					payload: result
				});

				return callback && callback();
			} else {
				const error: IError = {};

				if (response.status === 401) {
					// logout
				} else if (response.status === 404) {
					error.notfound = "Game not found";
				}

				return callback && callback(error);
			}
		} catch (err) {
			return callback && callback(err);
		}
	};
}

export function saveGame(gameData: IGame, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		try {
			const { token } = getState().account;

			const response = await Api.post(`/games`, gameData, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: SAVE_GAME,
					payload: result
				});

				return callback && callback(null, result.id);
			} else {
				const error: IError = {};

				if (response.status === 401) {
					// logout
				} else if (response.status === 404) {
					error.notfound = "Game not found";
				}

				return callback && callback(error);
			}
		} catch (err) {
			return callback && callback(err);
		}
	};
}

export function addMyGame(gameId: number, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		try {
			const { token } = getState().account;

			const response = await Api.post(`/games/myLibrary/${gameId}/add`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: ADD_MY_GAME,
					payload: result
				});

				return callback && callback();
			} else {
				const error: IError = {};

				if (response.status === 401) {
					// logout
				} else if (response.status === 404) {
					error.notfound = "Game not found";
				}

				return callback && callback(error);
			}
		} catch (err) {
			return callback && callback(err);
		}
	};
}

export function getMyGames(callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		const { token } = getState().account;

		try {
			const response = await Api.get("/games/myLibrary", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: GET_MY_GAMES,
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

export function getMyGame(myGameId: string, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		const { token } = getState().account;

		try {
			const response = await Api.get("/games/myLibrary/" + myGameId, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			console.log(response.status);

			if (response.status === 200) {
				const result = await response.data;
				console.log(result);

				dispatch({
					type: GET_MY_GAME,
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

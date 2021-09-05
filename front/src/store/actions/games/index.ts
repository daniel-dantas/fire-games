import { Dispatch } from "redux";
import IError from "../../../interfaces/IError";
import { IGame, IMyGame } from "../../../interfaces/IGame";
import Api from "../../../services/api";
import Storage from "../../../services/storage";
import { v4 as uuid } from "uuid";

export const GET_GAMES = "[GAME] GET_GAMES";
export const GET_GAME = "[GAME] GET_GAME";
export const SAVE_GAME = "[GAME] SAVE_GAME";
export const ADD_MY_GAME = "[GAME] ADD_MY_GAME";
export const GET_MY_GAMES = "[GAME] GET_MY_GAMES";
export const GET_MY_GAME = "[GAME] GET_MY_GAME";
export const UPDATE_MY_GAME = "[GAME] UPDATE_MY_GAME";
export const DELETE_MY_GAME = "[GAME] DELETE_MY_GAME";

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
			const front_cover = await Storage.upload(gameData.front_cover, uuid());

			gameData.front_cover = front_cover;

			const response = await Api.post(`/games`, gameData, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			console.log(response.status);

			if (response.status === 200 || response.status === 201) {
				const result = await response.data;

				console.log("RESULT");
				console.log(result);

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

export function addMyGame(
	gameId: number,
	gameAnnotation: IMyGame,
	callback?: Function
) {
	return async (dispatch: Dispatch, getState: Function) => {
		try {
			const { token } = getState().account;

			const response = await Api.post(
				`/games/myLibrary/${gameId}/add`,
				gameAnnotation,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

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

export function updateMyGame(myGameData: IMyGame, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		const { token } = getState().account;

		try {
			const response = await Api.put(
				"/games/myLibrary/" + myGameData.game.id,
				myGameData,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: UPDATE_MY_GAME,
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

export function deleteMygame(myGameId: string | number, callback?: Function) {
	return async (dispatch: Dispatch, getState: Function) => {
		const { token } = getState().account;

		try {
			const response = await Api.delete("/games/myLibrary/" + myGameId, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 200) {
				const result = await response.data;

				dispatch({
					type: DELETE_MY_GAME,
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

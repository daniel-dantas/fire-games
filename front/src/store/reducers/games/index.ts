import { HYDRATE } from "next-redux-wrapper";
import { EConsole, IGame, IMyGame } from "../../../interfaces/IGame";
import * as Actions from "../../actions/games";

let initialState = {
	loading: false,
	games: [],
	game: {},
	myGames: [],
	myGame: {}
};

const reducer = function (state = initialState, { type, payload }: any) {
	switch (type) {
		case HYDRATE: {
			return { ...state, ...payload };
		}
		case Actions.GET_GAMES: {
			return {
				...state,
				games: payload
			};
		}
		case Actions.GET_GAME: {
			return {
				...state,
				game: payload
			};
		}
		case Actions.SAVE_GAME: {
			return {
				...state,
				game: payload
			};
		}
		case Actions.ADD_MY_GAME: {
			return {
				...state,
				myGame: payload
			};
		}
		case Actions.GET_MY_GAMES: {
			return {
				...state,
				myGames: payload
			};
		}
		case Actions.GET_MY_GAME: {
			return {
				...state,
				myGame: payload
			};
		}
		case Actions.UPDATE_MY_GAME: {
			return {
				...state,
				myGame: payload
			};
		}
		case Actions.DELETE_MY_GAME: {
			return {
				...state
			};
		}
		default:
			return state;
	}
};

export default reducer;

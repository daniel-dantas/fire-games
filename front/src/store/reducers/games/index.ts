import { HYDRATE } from "next-redux-wrapper";
import { EConsole, IGame, IMyGame } from "../../../interfaces/IGame";
import * as Actions from "../../actions/games";

let initialState = {
	loading: false,
	games: [],
	game: {
		id: 1,
		title: "Watch dogs",
		console: EConsole.XBOX_ONE,
		year: "2016",
		front_cover: "/images/wd-xbox360.jpg"
	} as IGame,
	myGames: [
		{
			id: 1,
			concluded: true,
			personalNotes: "MUITO BOM",
			conclusionDate: new Date(),
			game: {
				id: 1,
				title: "Watch dogs",
				console: EConsole.XBOX_ONE,
				year: "2016",
				front_cover: "/images/wd-xbox360.jpg",
				age: 18
			}
		}
	] as IMyGame[],
	myGame: {
		id: 1,
		concluded: true,
		personalNotes: "MUITO BOM",
		conclusionDate: new Date(),
		game: {
			id: 1,
			title: "Watch dogs",
			console: EConsole.XBOX_ONE,
			year: "2016",
			front_cover: "/images/wd-xbox360.jpg",
			age: 18
		}
	} as IMyGame
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
		default:
			return state;
	}
};

export default reducer;

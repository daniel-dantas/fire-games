import { HYDRATE } from "next-redux-wrapper";
import IGame, { EConsole } from "../../../interfaces/IGame";

const initialState = {
	games: [
		{
			id: 1,
			title: "Watch dogs",
			console: EConsole.XBOX_ONE,
			year: "2016",
			front_cover: "/images/wd-xbox360.jpg"
		}
	] as IGame[]
};

const reducer = function (state = initialState, { type, payload }: any) {
	switch (type) {
		case HYDRATE: {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
};

export default reducer;

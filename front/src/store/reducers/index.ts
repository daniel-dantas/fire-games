import { combineReducers } from "redux";
import game from "./game";
import account from "./account";

const reducers = {
	game,
	account
};

export default combineReducers(reducers);

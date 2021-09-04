import { combineReducers } from "redux";
import games from "./games";
import account from "./account";

const reducers = {
	games,
	account
};

export default combineReducers(reducers);

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

function persistReducers(reducers: any): any {
	const persistedReducers = persistReducer(
		{
			key: "fire-games-website",
			storage,
			whitelist: ["login"]
		},
		reducers
	);

	return persistedReducers;
}

export default persistReducers;

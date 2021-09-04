import { HYDRATE } from "next-redux-wrapper";
import * as Actions from "../../actions/account";

const initialState = {
	loading: false,
	token: "",
	email: ""
};

const reducer = function (state = initialState, { type, payload }: any) {
	switch (type) {
		// case HYDRATE: {
		// 	return { ...state, ...payload };
		// }
		case Actions.SUBMIT_LOGIN: {
			return {
				...state,
				token: payload.token
			};
		}
		case Actions.SUBMIT_REGISTER: {
			return {
				...state
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;

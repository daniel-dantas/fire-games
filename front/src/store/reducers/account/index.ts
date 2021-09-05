import { HYDRATE } from "next-redux-wrapper";
import { setCookie } from "nookies";
import * as Actions from "../../actions/account";

const initialState = {
	loading: false,
	token: "",
	email: ""
};

const reducer = function (state = initialState, { type, payload }: any) {
	switch (type) {
		case HYDRATE: {
			return { ...state, ...payload };
		}
		case Actions.SUBMIT_LOGIN: {
			setCookie(undefined, "nextauth.token", payload.token, {});
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
		case Actions.LOGOUT: {
			setCookie(undefined, "nextauth.token", "", {});
			return {
				...state,
				token: ""
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;

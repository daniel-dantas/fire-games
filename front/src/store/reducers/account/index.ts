import { HYDRATE } from "next-redux-wrapper";
import * as Actions from "../../actions/account";

const initialState = {
	loading: false,
	token: "",
	email: ""
};

const reducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case HYDRATE: {
			return { ...state, ...payload };
		}
		case Actions.SUBMIT_LOGIN: {
			return {
				loading: true
			};
		}
		case Actions.SUBMIT_LOGIN_FAILED: {
			return {
				loading: false
			};
		}
		case Actions.SUBMIT_LOGIN_SUCCESS: {
			return {
				loading: false,
				token: payload.token
			};
		}
		case Actions.SUBMIT_REGISTER: {
			return {
				loading: true
			};
		}
		case Actions.SUBMIT_REGISTER_FAILED: {
			return {
				loading: false
			};
		}
		case Actions.SUBMIT_REGISTER_SUCCESS: {
			return {
				loading: false,
				...payload
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;

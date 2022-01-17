import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
// import { Action } from "../models/actionSchema";
import { UserState, initialUserState } from "../models/userSchema";
import { Reducer, AnyAction } from "redux";
// import { AuthState } from "../models/authSchema";

const isEmpty = require("is-empty");

interface AuthState {
	isAuthenticated: Boolean;
	user: UserState;
	loading: Boolean;
}

const initialAuthState: AuthState = {
	isAuthenticated: false,
	user: initialUserState,
	loading: false,
};

const user: Reducer<AuthState, AnyAction> = (state = initialAuthState, action: AnyAction) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};

export default user;

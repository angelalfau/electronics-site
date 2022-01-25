import { SET_DARK_MODE, LOAD_PREFS } from "../actions/types";
import { Reducer, AnyAction } from "redux";

const isEmpty = require("is-empty");

interface PrefState {
	darkMode: boolean;
	loaded: boolean;
}

const initialPrefState: PrefState = {
	darkMode: true,
	loaded: false,
};

const prefs: Reducer<PrefState, AnyAction> = (state = initialPrefState, action: AnyAction) => {
	switch (action.type) {
		case SET_DARK_MODE:
			return {
				...state,
				darkMode: action.payload,
			};
		case LOAD_PREFS:
			return {
				...state,
				darkMode: action.payload.darkMode,
				loaded: true,
			};
		default:
			return state;
	}
};

export default prefs;

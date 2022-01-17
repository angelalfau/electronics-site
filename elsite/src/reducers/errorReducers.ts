import { GET_ERRORS } from "../actions/types";
import { Action } from "../models/actionSchema";
import { initialErrorState, ErrorState } from "../models/errorSchema";
import { Reducer, AnyAction } from "redux";

const errors: Reducer<ErrorState, AnyAction> = (state = initialErrorState, action: AnyAction) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};

export default errors;

import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
const rootReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

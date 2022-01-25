import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import prefReducer from "./prefReducers";
const rootReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	prefs: prefReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import instance from "../components/axios";
import { FormData } from "../models/formSchema";
import { UserState, initialUserState } from "../models/userSchema";

// Register User
export const registerUser = (formData: FormData) => (dispatch: Function) => {
	instance
		.post("/signup", formData)
		.then((res) => {
			console.log("authAction for registering");
			console.log(res.data);
			if (res.data.errors) {
				console.log("error encountered: ", res.data.errors);
				dispatch({
					type: GET_ERRORS,
					payload: res.data.errors,
				});
			} else {
				// we login
				console.log("logging in with: ", formData);

				dispatch(loginUser(formData));
			}
			// if (res.data.errors) {

			// }
			// history.push("/login");
		}) // re-direct to login on successful register
		.catch((err) => {
			console.log("authAction err for register");
			console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// Login - get user token
export const loginUser = (formData: FormData) => (dispatch: Function) => {
	console.log("initiate log in auth action");

	instance
		.post("/login", formData)
		.then((res) => {
			console.log("start of authAction for logging in");
			console.log(res);
			if (res.data.errors) {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.errors,
				});
			} else {
				// Save to localStorage
				// Set token to localStorage
				const token = res.data.token;
				localStorage.setItem("jwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				const decoded: UserState = jwt_decode(token);
				// Set current user
				dispatch(setCurrentUser(decoded));
				console.log("end of authAction for logging in");
				window.location.href = "/";
			}
		})
		.catch((err) => {
			console.log("axios logging error");

			console.log(err.message);
			dispatch({
				type: GET_ERRORS,
				payload: err.message,
			});
		});
};

// Set logged in user
export const setCurrentUser = (decoded: UserState) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};

// Log user out
export const logoutUser = () => (dispatch: Function) => {
	console.log("action for logout");
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser(initialUserState));
	window.location.href = "/signup";
};

export const setErrors = (errors: any) => {
	return {
		type: GET_ERRORS,
		payload: errors,
	};
};

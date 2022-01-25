import { SET_DARK_MODE, LOAD_PREFS } from "./types";

// toggles dark mode and stores in local storage
export const setDarkMode = (darkMode: boolean) => {
	localStorage.setItem("darkMode", JSON.stringify(darkMode));
	return {
		type: SET_DARK_MODE,
		payload: darkMode,
	};
};

// when user opens page, it will attempt to load user prefs from localstorage
export const loadPrefs = () => {
	const darkMode = localStorage.getItem("darkMode");
	return {
		type: LOAD_PREFS,
		payload: {
			darkMode: darkMode ? JSON.parse(darkMode) : true,
		},
	};
};

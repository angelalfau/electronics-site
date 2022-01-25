import React, { useState, useEffect, useCallback } from "react";
import "./homePage.css";
// import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import LaunchLink from "./LaunchLink";
import {
	registerUser,
	loginUser,
	setCurrentUser,
	setUserLoading,
	logoutUser,
} from "../actions/authActions";

const HomePage = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const darkMode = useSelector((state: RootState) => state.prefs.darkMode);
	const dispatch = useDispatch();

	return (
		<div id="home-background">
			<div id="link-start">{/* <LaunchLink /> */}</div>
		</div>
	);
};

export default HomePage;

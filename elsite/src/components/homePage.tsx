import React, { useState, useEffect, useCallback } from "react";
// import instance from "./axios.js";
// import { Link } from "react-router-dom";
import "./signupPage.css";
// import { Form, Button } from "react-bootstrap";
// import { alignPropType } from "react-bootstrap/esm/DropdownMenu";
// import money from "./icons/dollar_signs.png";
// import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import {
	registerUser,
	loginUser,
	setCurrentUser,
	setUserLoading,
	logoutUser,
} from "../actions/authActions";

const HomePage = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();
	return <div>Hello, {user.name}</div>;
};

export default HomePage;

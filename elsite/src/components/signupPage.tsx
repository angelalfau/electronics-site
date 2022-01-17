import React, { useState, useEffect, useCallback } from "react";
import instance from "./axios";
import { Link } from "react-router-dom";
import "./signupPage.css";
import { Form, Button } from "react-bootstrap";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";
import money from "./icons/dollar_signs.png";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { UserState } from "../models/userSchema";
import {
	setErrors,
	registerUser,
	loginUser,
	setCurrentUser,
	setUserLoading,
	logoutUser,
} from "../actions/authActions";

const SignupPage = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const errors = useSelector((state: RootState) => state.errors);
	const dispatch = useDispatch();

	const initialFormData = Object.freeze({
		name: "",
		email: "",
		password: "",
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [selection, setSelection] = useState(0);
	const isLoading = useSelector((state: RootState) => state.auth.loading);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};
	useEffect(() => {
		setUserLoading();
		console.log("user Effect: ", user);
		console.log("loading: ", isLoading);
	});

	const handleSignup = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log("trying to signup");
		console.log(formData);
		try {
			await dispatch(registerUser(formData));
		} catch (err) {
			console.log("catching err");
			console.log(err);
		}
	};

	const handleLogin = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(setErrors(""));
		console.log("trying to log in");
		console.log(formData);
		try {
			setUserLoading();
			await dispatch(loginUser(formData));
			console.log("routing to homepage");
			window.location.href = "/";
		} catch (err) {
			console.log("catching err");
			console.log(err);
		}
	};

	const selectSignup = () => {
		let form = document.getElementById("loginform");
		if (form) (form as HTMLFormElement).reset();
		// document.getElementById("loginform").reset();
		setSelection(0);
		dispatch(setErrors(""));
		updateFormData(initialFormData);
	};
	const selectLogin = () => {
		// document.getElementById("signupform").reset();
		let form = document.getElementById("loginform");
		if (form) (form as HTMLFormElement).reset();
		setSelection(1);
		dispatch(setErrors(""));
		updateFormData(initialFormData);
	};
	return (
		<div id="background">
			<div id="container">
				<h2 id="summary">A budget manager app to help manage budget!</h2>
				<div id="form">
					{selection === 0 ? (
						<Form id="signupform" onSubmit={handleSignup}>
							<Form.Group className="formelement" controlId="formName">
								<Form.Control
									name="name"
									// required
									type="text"
									placeholder="Full name"
									onChange={handleChange}
								/>
							</Form.Group>
							{errors?.name ? (
								<p className="erroritem">{errors.name}</p>
							) : (
								<div></div>
							)}

							<Form.Group className="formelement" controlId="formBasicEmail">
								<Form.Control
									name="email"
									// required
									type="text"
									placeholder="Email address"
									onChange={handleChange}
								/>
							</Form.Group>
							{errors?.email ? (
								<p className="erroritem">{errors.email}</p>
							) : (
								<div></div>
							)}

							<Form.Group className="formelement" controlId="formBasicPassword">
								<Form.Control
									// required
									name="password"
									type="password"
									placeholder="Password"
									onChange={handleChange}
								/>
							</Form.Group>
							{errors?.password ? (
								<p className="erroritem">{errors.password}</p>
							) : (
								<div></div>
							)}

							{/* <Form.Group className="formelement" controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Confirm password" />
                    </Form.Group> */}
							<Button className="formelement" id="loginbtn" type="submit">
								Sign up!
							</Button>
						</Form>
					) : (
						<Form id="loginform" onSubmit={handleLogin}>
							<Form.Group className="formelement" controlId="formBasicEmail">
								<Form.Control
									name="email"
									// required
									type="text"
									placeholder="Email address"
									onChange={handleChange}
								/>
							</Form.Group>
							{errors?.email ? <p className="erroritem">{errors.email}</p> : <div />}

							<Form.Group className="formelement" controlId="formBasicPassword">
								<Form.Control
									// required
									name="password"
									type="password"
									placeholder="Password"
									onChange={handleChange}
								/>
							</Form.Group>
							{errors?.password ? (
								<p className="erroritem">{errors.password}</p>
							) : (
								<div />
							)}

							{/* <Form.Group className="formelement" controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Confirm password" />
                        </Form.Group> */}
							<Button className="formelement" id="loginbtn" type="submit">
								Log in
							</Button>
						</Form>
					)}
					{selection === 0 ? (
						<button className="switchform" onClick={selectLogin}>
							Already a user? Login here
						</button>
					) : (
						<button className="switchform" onClick={selectSignup}>
							New user? Signup here
						</button>
					)}
				</div>
			</div>
			<div id="inforow">
				<div id="leftinfo" className="infobox">
					<img src={money} alt="money" />
					<h2>Transactions</h2>
				</div>
				<div id="leftinfo" className="infobox">
					<img src={money} alt="money" />
					<h2>Transactions</h2>
				</div>
				<div id="leftinfo" className="infobox">
					<img src={money} alt="money" />
					<h2>Transactions</h2>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;

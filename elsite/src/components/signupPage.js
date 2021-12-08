import { React, useState, useEffect, useCallback } from "react";
import instance from "./axios.js";
import { Link } from "react-router-dom";
import "./signupPage.css";
import { Form, Button } from "react-bootstrap";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";
import money from "./icons/dollar_signs.png";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link";
import { useSelector, useDispatch } from "react-redux";
import {
    registerUser,
    loginUser,
    setCurrentUser,
    setUserLoading,
    logoutUser,
} from "../actions/authActions.js";

const SignupPage = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const initialFormData = Object.freeze({
        name: "",
        email: "",
        password: "",
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [selection, setSelection] = useState(0);
    const [errors, setErrors] = useState("");
    const isLoading = useSelector((state) => state.loading);

    const handleChange = (e) => {
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

    const handleSignup = async (e) => {
        e.preventDefault();
        // setErrors("");
        console.log("trying to signup");
        console.log(formData);
        // console.log(errors);
        try {
            await dispatch(registerUser(formData)).then((res) => {
                console.log(res);
            });
            // await instance.post("/signup", formData).then((res) => {
            //     console.log(res);
            //     setErrors(res.data.errors);
            //     console.log("axios instance for signing up");

            //     console.log(errors);
            // });
        } catch (err) {
            console.log("catching err");
            console.log(err);
        }
        // try {
        //     await instance.post("/create-token", {
        //         username: "user_good",
        //         password: "pass_good",
        //     });
        // } catch (err) {
        //     console.log(err);
        // }
    };
    // const config = {
    //     onSuccess: (public_token, metadata) => {},
    //     onExit: (err, metadata) => {},
    //     onEvent: (eventName, metadata) => {},
    //     token: "GENERATED_LINK_TOKEN",
    //     // required for OAuth:
    //     receivedRedirectUri: window.location.href,
    //     // if not OAuth, set to null or do not include:
    //     receivedRedirectUri: null,
    // };
    // const { open, exit, ready } = usePlaidLink(config);
    // useEffect(() => {
    //     if (ready) {
    //         open();
    //     }
    // }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors("");
        console.log("trying to log in");
        console.log(formData);
        // console.log(errors);
        try {
            setUserLoading();
            await dispatch(loginUser(formData));
            // await instance.post("/login", formData).then((res) => {
            //     console.log(res);
            //     setErrors(res.data.errors || "");
            //     console.log("axios instance for logging in");
            //     console.log(errors);
            // });
        } catch (err) {
            console.log("catching err");
            console.log(err);
        }
    };

    const selectSignup = () => {
        document.getElementById("loginform").reset();
        setSelection(0);
        setErrors("");
        updateFormData(initialFormData);
    };
    const selectLogin = () => {
        document.getElementById("signupform").reset();
        setSelection(1);
        setErrors("");
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
                            {errors?.name ? <p class="erroritem">{errors.name}</p> : <div></div>}

                            <Form.Group className="formelement" controlId="formBasicEmail">
                                <Form.Control
                                    name="email"
                                    // required
                                    type="text"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {errors?.email ? <p class="erroritem">{errors.email}</p> : <div></div>}

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
                                <p class="erroritem">{errors.password}</p>
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
                            {errors?.email ? <p class="erroritem">{errors.email}</p> : <div />}

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
                                <p class="erroritem">{errors.password}</p>
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
                        <button class="switchform" onClick={selectLogin}>
                            Already a user? Login here
                        </button>
                    ) : (
                        <button class="switchform" onClick={selectSignup}>
                            New user? Signup here
                        </button>
                    )}
                </div>
            </div>
            <div id="inforow">
                <div id="leftinfo" class="infobox">
                    <img src={money} alt="money" />
                    <h2>Transactions</h2>
                </div>
                <div id="leftinfo" class="infobox">
                    <img src={money} alt="money" />
                    <h2>Transactions</h2>
                </div>
                <div id="leftinfo" class="infobox">
                    <img src={money} alt="money" />
                    <h2>Transactions</h2>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

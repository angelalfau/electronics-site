import { React, useState, useEffect } from "react";
import instance from "./axios.js";
import { Link } from "react-router-dom";
import "./homePage.css";
import { Form, Button } from "react-bootstrap";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

const HomePage = () => {
    const initialFormData = Object.freeze({
        name: "",
        email: "",
        password: "",
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        // setErrors("");
        console.log("trying to signup");
        console.log(formData);
        // console.log(errors);
        try {
            await instance.post("/signup", formData).then((res) => {
                console.log(res);
                setErrors(res.data.errors);
                console.log("axios instance for signing up");
                console.log(errors);
            });
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

    return (
        <div id="background">
            <div id="container">
                <h2 id="summary">A budget manager app to help manage budget!</h2>
                <Form id="loginform" onSubmit={handleSignup}>
                    <Form.Group className="formelement" controlId="formName">
                        <Form.Control
                            name="name"
                            // required
                            type="text"
                            placeholder="Name"
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
                    {errors?.password ? <p class="erroritem">{errors.password}</p> : <div></div>}

                    {/* <Form.Group className="formelement" controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Confirm password" />
                    </Form.Group> */}
                    <Button className="formelement" id="loginbtn" type="submit">
                        Sign up!
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default HomePage;

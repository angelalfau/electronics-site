import { React, useState, useEffect } from "react";
// This will require to npm install axios
import instance from "./axios.js";
import { Link } from "react-router-dom";
import dark_background from "./icons/black-circuit.png";
import light_background from "./icons/light_circuit.jpg";
import "./homePage.css";
import { Form, Button } from "react-bootstrap";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

const HomePage = () => {
    // This is the constructor that shall store our data retrieved from the database
    // const [records, setRecords] = useState([]);

    const initialFormData = Object.freeze({
        name: "",
        email: "",
        password: "",
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    // This method will get the data from the database.
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:7000/signup")
    //         .then((response) => {
    //             this.setState({ records: response.data });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, []);

    // This method will delete a record based on the method
    // const deleteRecord = (id) => {
    //     axios.delete("http://localhost:7000/" + id).then((response) => {
    //         console.log(response.data);
    //     });

    //     this.setState({
    //         record: this.state.records.filter((el) => el._id !== id),
    //     });
    // };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("trying to signup");
        console.log(formData);
        try {
            await instance.post("/signup", formData).then((res) => {
                //console.log("axios instance for signing up");
                //console.log(res);
            });
        } catch (err) {
            console.log(err);
        }
        try {
            await instance.post("/create-token", {
                username: "user_good",
                password: "pass_good",
            });
        } catch (err) {
            console.log(err);
        }
    };

    // This following section will display the table with the records of individuals.
    return (
        <div id="background">
            <div id="container">
                <h1 id="summary">A budget manager app to help manage budget!</h1>
                <Form id="loginform" onSubmit={handleSignup}>
                    <Form.Group className="formelement" controlId="formName">
                        <Form.Control
                            name="name"
                            required
                            type="text"
                            placeholder="Name"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="formelement" controlId="formBasicEmail">
                        <Form.Control
                            name="email"
                            required
                            type="email"
                            placeholder="Email address"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="formelement" controlId="formBasicPassword">
                        <Form.Control
                            required
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* <Form.Group className="formelement" controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Confirm password" />
                    </Form.Group> */}
                    <Button className="formelement" id="loginbtn" type="submit">
                        Sign in
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default HomePage;

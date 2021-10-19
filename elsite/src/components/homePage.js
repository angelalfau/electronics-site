import { React, useState, useEffect } from "react";
// This will require to npm install axios
import axios from "axios";
import { Link } from "react-router-dom";
import dark_background from "./icons/black-circuit.png";
import light_background from "./icons/light_circuit.jpg";
import "./homePage.css";
import { Form, Button } from "react-bootstrap";

const HomePage = () => {
    // This is the constructor that shall store our data retrieved from the database
    const [records, setRecords] = useState([]);

    // This method will get the data from the database.
    useEffect(() => {
        axios
            .get("http://localhost:5000/record/")
            .then((response) => {
                this.setState({ records: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // This method will delete a record based on the method
    const deleteRecord = (id) => {
        axios.delete("http://localhost:5000/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            record: this.state.records.filter((el) => el._id !== id),
        });
    };

    // This following section will display the table with the records of individuals.
    return (
        <div id="background">
            <div id="container">
                <h1 id="summary">A budget manager app to help manage budget!</h1>
                <Form id="loginform">
                    <Form.Group className="formelement" controlId="formName">
                        <Form.Control required type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="formelement" controlId="formBasicEmail">
                        <Form.Control required type="email" placeholder="Email address" />
                    </Form.Group>
                    <Form.Group className="formelement" controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="formelement" controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Confirm password" />
                    </Form.Group>
                    <Button className="formelement" id="loginbtn" type="submit">
                        Sign in
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default HomePage;

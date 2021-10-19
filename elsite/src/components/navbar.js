import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
// We import bootstrap to make our application look better.
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.css";

import { FiSun, FiMoon } from "react-icons/fi";

import logo from "./icons/default-user-icon.jpg";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
const Navbar = ({ themeToggler, themeDark }) => {
    // const [show, handleShow] = useState(false);

    const click = () => {
        themeToggler();
        console.log("click");
    };

    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         if (window.scrollY > 100) {
    //             handleShow(true);
    //         } else handleShow(false);
    //     });
    //     return () => {
    //         window.removeEventListener("scroll");
    //     };
    // }, []);

    return (
        <div>
            <nav id={themeDark ? "dark" : "light"} className="navbar">
                <div className="nav-brand">
                    <NavLink className="nav-brand" id={themeDark ? "dark" : "light"} to="/">
                        el<span id="brandstar">⭐</span>sito
                    </NavLink>
                </div>
                <Button flex="1" className="hidden" onClick={() => click()}>
                    {themeDark ? <FiSun size={30} /> : <FiMoon size={30} color="black" />}
                </Button>

                <Dropdown className="hidden" flex="1">
                    <Dropdown.Toggle
                        variant="light"
                        className="bg-white border-0 p-0"
                        id="dropdown-basic"
                    >
                        <img src={logo} id="UserLogo" alt="text" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu flip={false} align="end" className="usermenu">
                        <Dropdown.Item href="#/action-2">Account Settings</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
        </div>
    );
};

export default Navbar;

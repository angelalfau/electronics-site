import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import { FiSun, FiMoon } from "react-icons/fi";
import logo from "./icons/default-user-icon.jpg";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import { useSelector, useDispatch } from "react-redux";

interface NavProps {
	themeToggler: Function;
	themeDark: boolean;
}

const Navbar = ({ themeToggler, themeDark }: NavProps) => {
	// const [show, handleShow] = useState(false);

	const dispatch = useDispatch();

	const click = () => {
		themeToggler();
		// console.log("click");
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

	const handleSignout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log("trying to log out");
		e.preventDefault();
		try {
			await dispatch(logoutUser());
		} catch (err) {
			console.log("error for signing out: ", err);
		}
	};

	return (
		<div>
			<nav id={themeDark ? "dark" : "light"} className="navbar">
				<div className="nav-brand">
					<NavLink className="nav-brand" id={themeDark ? "dark" : "light"} to="/">
						el<span id="brandstar">⭐</span>sito
					</NavLink>
				</div>
				<Button className="hidden" onClick={() => click()}>
					{themeDark ? <FiSun size={30} /> : <FiMoon size={30} color="black" />}
				</Button>

				<Dropdown className="hidden">
					<Dropdown.Toggle
						variant="light"
						className="bg-white border-0 p-0"
						id="dropdown-basic"
					>
						<img src={logo} id="UserLogo" alt="text" />
					</Dropdown.Toggle>
					<Dropdown.Menu flip={false} className="usermenu">
						<Dropdown.Item href="#/action-2">Account Settings</Dropdown.Item>
						<Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</nav>
		</div>
	);
};

export default Navbar;

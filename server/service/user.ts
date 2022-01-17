// const express = require("express");
const { userInfo } = require("os");
import User from "../models/User";
import instance from "./axios";
import Validator from "validator";
import jwt from "jsonwebtoken";

interface formBody {
	password: string;
	email: string;
	name: string;
}

const login = async (body: formBody) => {
	var errors = {
		id: "",
		name: "",
		password: "",
		email: "",
	};
	var anyErrors = false;

	if (body.password == "") {
		errors.password = "Please enter a password";
		anyErrors = true;
	}

	if (body.email == "") {
		errors.email = "Email field is required";
		anyErrors = true;
	} else if (!Validator.isEmail(body.email)) {
		errors.email = "Email is invalid";
		anyErrors = true;
	}

	// can add confirm password here
	// can add hashing/salting of password here

	if (anyErrors) {
		return [true, errors];
	} else {
		var userQuery = {
			id: "",
			name: "",
			email: "",
			password: "",
		};
		await User.findOne({ email: body.email, password: body.password }).then((res) => {
			// console.log("res: ", res);
			userQuery = res;
		});
		console.log("query shown below");
		console.log(userQuery);
		if (userQuery) {
			// Log in successful, set up jwt
			console.log("Found User");
			return [false, userQuery];
			// jwt.sign(
			//     {
			//         id: userQuery.id,
			//         name: userQuery.name,
			//     },
			//     "secret",
			//     {
			//         expiresIn: 31556926, // 1 year in seconds
			//     },
			//     (err, token) => {
			//         res.json({
			//             success: true,
			//             token: "Bearer " + token,
			//         });
			//     }
			// );
		} else {
			console.log("incorrect email or password");
			errors.email = "Incorrect email or password";
			return [true, errors];
		}
		// return [false, post];
	}
};

// register a new user
// check if email is alrdy signed up
const signup = async (body: formBody) => {
	var errors = {
		password: "",
		email: "",
		name: "",
	};
	var anyErrors = false;

	if (body.email == "") {
		errors.email = "Email field is required";
		anyErrors = true;
	} else if (!Validator.isEmail(body.email)) {
		errors.email = "Email is invalid";
		anyErrors = true;
	} else if (await User.exists({ email: body.email })) {
		errors.email = "Email is taken";
		anyErrors = true;
	}

	if (body.name == "") {
		errors.name = "Please enter your full name";
		anyErrors = true;
	}

	if (body.password == "") {
		errors.password = "Please enter a password";
		anyErrors = true;
	}
	// can add confirm password here
	// can add hashing/salting of password here

	if (anyErrors) {
		return [true, errors];
	} else {
		const newUser = new User(body);
		const post = await newUser.save();
		return [false, post];
	}
};

// delete a user given email and authorization
// must either be admin or user being deleted
const deleteUser = async (body: formBody) => {
	const deleted = User.findOneAndDelete({ email: body.email });
	return deleted;
};

// retrieve JSON's of all users
// for admin purposes
const getAllUsers = async () => {
	const ret = await User.find({});
	return ret;
};

const deleteAllUsers = async () => {
	User.deleteMany({}, (err: any, result: any) => {
		if (err) console.log(err);
		else console.log(result);
	});
};

exports.login = login;
exports.signup = signup;
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
exports.deleteAllUsers = deleteAllUsers;

export default {
	login,
	signup,
	deleteUser,
	getAllUsers,
	deleteAllUsers,
};

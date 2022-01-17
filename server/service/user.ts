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
	var post = {
		errors: {
			email: "",
			password: "",
		},
		anyErrors: false,
		id: "",
		name: "",
		password: "",
		email: "",
	};

	if (body.password === "") {
		post.errors.password = "Please enter a password";
		post.anyErrors = true;
	}

	if (body.email == "") {
		post.errors.email = "Email field is required";
		post.anyErrors = true;
	} else if (!Validator.isEmail(body.email)) {
		post.errors.email = "Email is invalid";
		post.anyErrors = true;
	}

	// can add confirm password here
	// can add hashing/salting of password here

	if (post.anyErrors) {
		return post;
	} else {
		await User.findOne({ email: body.email, password: body.password }).then((res) => {
			console.log("res: ", res);
			if (res) {
				post.id = res.id;
				post.email = res.email;
				post.password = res.password;
				post.name = res.name;
			} else {
				console.log("incorrect email or password");
				post.errors.email = "Incorrect email or password";
				post.anyErrors = true;
			}
		});
		console.log("query shown below");
		console.log(post);
		if (!post.anyErrors) {
			// Log in successful
			console.log("Found User");
			return post;
		} else {
			// Log in not successful
			console.log("incorrect email or password");
			post.errors.email = "Incorrect email or password";
			post.anyErrors = true;
			return post;
		}
		// return [false, post];
	}
};

// register a new user
// check if email is alrdy signed up
const signup = async (body: formBody) => {
	var post = {
		errors: {
			email: "",
			name: "",
			password: "",
		},
		anyErrors: false,
		password: "",
		email: "",
		name: "",
	};

	if (body.email == "") {
		post.errors.email = "Email field is required";
		post.anyErrors = true;
	} else if (!Validator.isEmail(body.email)) {
		post.errors.email = "Email is invalid";
		post.anyErrors = true;
	} else if (await User.exists({ email: body.email })) {
		post.errors.email = "Email is taken";
		post.anyErrors = true;
	}

	if (body.name == "") {
		post.errors.name = "Please enter your full name";
		post.anyErrors = true;
	}

	if (body.password == "") {
		post.errors.password = "Please enter a password";
		post.anyErrors = true;
	}
	// can add confirm password here
	// can add hashing/salting of password here

	if (post.anyErrors) {
		return post;
	} else {
		const newUser = new User(body);
		const post = await newUser.save();
		return post;
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

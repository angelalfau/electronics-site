// const express = require("express");
import express from "express";
import { Request, Response, NextFunction, RequestHandler } from "express";
const router = express.Router();
// const user = require("../service/user.tsx");
import user from "../service/user";
// var path = require("path");
import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

// route for logging in
router.post("/login", async (req: Request, res: Response) => {
	try {
		console.log("logging in");
		console.log(req.body);
		const post = await user.login(req.body);

		if (post.anyErrors) {
			console.log("found errors");
			console.log(post.errors);
			res.status(200).json({ errors: post.errors });
		} else {
			console.log("no errors found");
			await jwt.sign(
				{
					id: post.id,
					name: post.name,
					email: post.email,
				},
				"secret",
				{
					expiresIn: 31556926, // 1 year in seconds
				},
				(err, token) => {
					console.log(`user_controller token: ${token}`);

					res.json({
						success: true,
						token: "Bearer " + token,
					});
				}
			);
			// res.status(201).json(post);
		}
	} catch (error) {
		console.log("caught error : " + error);
		res.status(400).json(error);
	}
});

// route for registering a user
router.post("/signup", async (req: Request, res: Response) => {
	try {
		console.log("signing up");
		console.log(req.body);
		const post = await user.signup(req.body);

		if (post.anyErrors) {
			console.log("found errors");
			console.log(post.errors);
			res.status(200).json({ errors: post.errors });
		} else {
			res.status(201).json(post);
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

// route for getting all users, must be authorized ideally
router.get("/allusers", async (req: Request, res: Response) => {
	try {
		const get = await user.getAllUsers();
		get.forEach((acc) => {
			res.write(acc.email + " : " + acc.password + " : " + acc.id);
			res.write("\n");
		});
		res.status(201).send();
	} catch (error) {
		// res.status(400).json({ msg: error });
		console.log(error);
		res.status(400).send(error);
	}
});

// route for deleting a user account
router.delete("/removeuser", async (req: Request, res: Response) => {
	try {
		const deleted = await user.deleteUser(req.body);
		res.status(200).json(deleted);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.delete("/deleteallusers", async (req: Request, res: Response) => {
	console.log("attempting to delete all");
	try {
		await user.deleteAllUsers();
		res.status(200).send("deleted all users. hope this was not a mistake");
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;

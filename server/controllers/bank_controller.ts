// const express = require("express");
import { Request, Response, NextFunction, RequestHandler } from "express";
import express from "express";
const router = express.Router();
// const bank = require("../service/bank");
import bank from "../service/bank";

// router.get("/getbanks", async (req, res) => {
//     res.send("uwu Hello");
// try {
//     const posts = await Posts.find();
//     if (!posts) throw Error("No Items");
//     res.status(200).json(posts);
// } catch (err) {
//     res.status(400).json({ mesg: err });
// }
// });

// router.post("/newbank", async (req, res) => {
//     const newPost = new Posts(req.body);
//     try {
//         const post = await newPost.save();
//         if (!post) throw Error("Something went wrong with the post");
//         res.status(200).json(post);
//     } catch {
//         res.status(400).json({ msg: error });
//     }
// });

router.post("/create-token", async (req: Request, res: Response) => {
	console.log("attempting to create token");
	try {
		console.log(req.body);
		await bank.createToken(req.body);
		res.status(200).send("created token");
	} catch (err) {
		res.status(400).json(err);
	}
});

// generates new sandbox token, no params needed
router.post("/sb-create-token", async (req: Request, res: Response) => {
	console.log("attempting to create sandbox token");
	try {
		await bank.sandboxCreateToken();
		res.status(200).send("created sandbox token");
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// gets user balance, given access_token
router.post("/balance", async (req: Request, res: Response) => {
	console.log("attempting to get balance");
	console.log(req.body);
	try {
		const access_token = req.body.access_token;
		const ret = await bank.getBalance(access_token);
		console.log("returning balance");
		console.log(ret);
		res.status(200).send(ret);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

router.post("/transactions", async (req: Request, res: Response) => {
	console.log("getting transactions...");
	try {
		const access_token = req.body.access_token;
		const ret = await bank.getTransactions(access_token);
		console.log("returning Transactions");
		console.log(ret);
		res.status(200).send(ret);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

module.exports = router;

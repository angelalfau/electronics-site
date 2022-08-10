import { Request, Response, NextFunction, RequestHandler } from "express";
import express from "express";
const router = express.Router();
import bank from "../service/bank";

router.post("/create_link_token", async function (req: Request, res: Response) {
	// Get the client_user_id by searching for the current user
	const createTokenResponse = await bank.createLinkToken(req.body);
	if (createTokenResponse) {
		console.log(createTokenResponse.data);

		res.json(createTokenResponse.data);
	} else {
		res.send("Error with creating Link Token").status(400);
	}
});

// Conversion of Link Token to Permanent Token
router.post("/set_access_token", async (req: Request, res: Response) => {
	console.log("set access token called");
	console.log(req.body);
	const post = await bank.setAccessToken(req.body);
	console.log(post);

	res.json({
		access_token: post.ACCESS_TOKEN,
		item_id: post.ITEM_ID,
	});
});

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

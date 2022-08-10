import Bank from "../models/Bank";
import User from "../models/User";
import instance from "./axios";
import sb_instance from "./sb_axios";
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";

const PLAID_ENV = process.env.PLAID_ENV;

const configuration = new Configuration({
	basePath: PlaidEnvironments[PLAID_ENV ? PLAID_ENV : "sandbox"],
	baseOptions: {
		headers: {
			"PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
			"PLAID-SECRET": process.env.PLAID_SECRET_DEVELOPMENT,
			"Plaid-Version": "2020-09-14",
		},
	},
});

const client = new PlaidApi(configuration);

interface LinkTokenBody {
	id: string;
}

const createLinkToken = async (body: LinkTokenBody) => {
	const request = {
		user: {
			// This should correspond to a unique id for the current user.
			client_user_id: body.id,
			// can pass in name and number and email
		},
		client_name: "elsito",
		products: [Products.Auth],
		language: "en",
		//webhook: "https://webhook.example.com",
		// redirect_uri: "",
		country_codes: [CountryCode.Us],
	};
	try {
		return await client.linkTokenCreate(request);
	} catch (error) {
		console.log(error);
	}
};

interface SetAccessTokenProps {
	PUBLIC_TOKEN: string;
	id: string;
}

const setAccessToken = async ({ PUBLIC_TOKEN, id }: SetAccessTokenProps) => {
	console.log("PUBLIC_TOKEN: ", PUBLIC_TOKEN);
	console.log("id: ", id);
	const tokenResponse = await client.itemPublicTokenExchange({
		public_token: PUBLIC_TOKEN,
	});
	const ACCESS_TOKEN = tokenResponse.data.access_token;
	const ITEM_ID = tokenResponse.data.item_id;
	// if (PLAID_PRODUCTS.includes("transfer")) {
	// 	TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
	// }

	// store access token in users db
	await User.findOneAndUpdate(
		{ _id: id },
		{
			access_token: ACCESS_TOKEN,
		}
	).then((res) => {
		console.log(res);
	});
	return {
		ACCESS_TOKEN: ACCESS_TOKEN,
		ITEM_ID: ITEM_ID,
	};
};

interface NewTokenBody {}

const createToken = async (body: NewTokenBody) => {
	console.log(body);
	try {
		await instance.post("/link/token/create", {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			client_name: "elsito",
			language: "en",
			country_codes: "US",
			user: {
				client_user_id: "",
				legal_name: "Angel Alfau",
				phone_number: "6467307444",
				phone_number_verified_time: "",
				email_address: "",
				email_address_verified_time: "",
			},
		});
	} catch (err) {
		console.log(err);
	}
};

const sandboxCreateToken = async () => {
	try {
		await sb_instance
			.post("/sandbox/public_token/create", {
				client_id: process.env.PLAID_CLIENT_ID,
				secret: process.env.PLAID_SECRET,
				institution_id: "ins_109508",
				initial_products: [
					"transactions",
					"balance",
					"transfer",
					"income",
					"auth",
					"identity",
					"investments",
				],
			})
			.then(async (res) => {
				console.log("new token created");
				console.log(res.data);
				const public_token = res.data.public_token;
				try {
					await sb_instance
						.post("/item/public_token/exchange", {
							client_id: process.env.PLAID_CLIENT_ID,
							secret: process.env.PLAID_SECRET,
							public_token: public_token,
						})
						.then((res) => {
							console.log("exchanged public token for access token");
							console.log(res.data);
						});
				} catch (err) {
					console.log(err);
				}
			});
	} catch (err) {
		console.log(err);
	}
};

const getBalance = async (access_token: string) => {
	var ret = "";
	try {
		await sb_instance
			.post("/accounts/balance/get", {
				access_token: access_token,
				client_id: process.env.PLAID_CLIENT_ID,
				secret: process.env.PLAID_SECRET,
			})
			.then((res) => {
				ret = res.data;
			});
	} catch (err) {
		console.log(err);
	}
	return ret;
};

const getTransactions = async (access_token: string) => {
	var ret = "";
	try {
		await sb_instance
			.post("/transactions/get", {
				access_token: access_token,
				client_id: process.env.PLAID_CLIENT_ID,
				secret: process.env.PLAID_SECRET,
				start_date: "2021-11-10",
				end_date: "2021-11-20",
			})
			.then((res) => {
				ret = res.data;
			});
	} catch (err) {
		console.log("error while getting transactions from Plaid");
		console.log(err);
	}
	return ret;
};

exports.createToken = createToken;
exports.sandboxCreateToken = sandboxCreateToken;
exports.getBalance = getBalance;
exports.getTransactions = getTransactions;

export default {
	createLinkToken,
	createToken,
	sandboxCreateToken,
	getBalance,
	getTransactions,
	setAccessToken,
};

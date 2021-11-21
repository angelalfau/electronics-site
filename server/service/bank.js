const { get } = require("http");
const Bank = require("../models/Bank");
const instance = require("./axios.js");
const sb_instance = require("./sb_axios.js");

const createToken = async (body) => {
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

const getBalance = async (access_token) => {
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

const getTransactions = async (access_token) => {
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

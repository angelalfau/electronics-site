const axios = require("axios");

const instance = axios.create({
    baseURL: "https://sandbox.plaid.com",
});

module.exports = instance;

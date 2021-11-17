const axios = require("axios");

const sb_instance = axios.create({
    baseURL: "https://development.plaid.com",
});

module.exports = sb_instance;

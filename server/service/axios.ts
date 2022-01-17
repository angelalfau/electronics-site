import axios from "axios";

const instance = axios.create({
	baseURL: "https://development.plaid.com",
});

export default instance;

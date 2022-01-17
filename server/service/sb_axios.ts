import axios from "axios";

const sb_instance = axios.create({
	baseURL: "https://sandbox.plaid.com",
});

export default sb_instance;

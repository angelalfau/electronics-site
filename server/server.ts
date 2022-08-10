require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import passport from "passport";
import modules from "./modules";
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions)
	.then(() => console.log("MongoDB connected!"))
	.catch((err) => console.log(err));

app.use(passport.initialize());

require("./service/passport.ts")(passport);

app.use(modules.Bank, modules.User);

app.listen(port, () => console.log(`Server running at port ${port}`));

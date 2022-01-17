// const express = require("express");
import express from "express";
// const cors = require("cors");
import cors from "cors";
// const mongoose = require("mongoose");
import mongoose, { ConnectOptions } from "mongoose";
import passport from "passport";
// const { MONGO_URI } = require("./config");
// var modules = require("./modules.ts");
import modules from "./modules";
//require("dotenv").config({ path: "./config.env" });
require("dotenv").config();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;
// const passport = require("passport");

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

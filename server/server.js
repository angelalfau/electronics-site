const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
var modules = require("./modules.js");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));

app.use(modules.Banks, modules.Users);

app.listen(port, () => console.log(`Server running at port ${port}`));

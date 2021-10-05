const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var router = express.Router();
const { MONGO_URI } = require("./config");
// require("dotenv").config({ path: "./config.env" });
// const router = require("./api/posts_controller");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// MONGO_URI =
//     "mongodb+srv://aalfau001:Alphaq9!@el-site.cgkb2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));

// app.use("/api/posts_controller", router);

app.use(require("./api/posts_controller"));

app.listen(port, () => console.log(`Server running at port ${port}`));

const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const user = require("../service/user");
var path = require("path");

// route for logging in
router.get("/user/{email}/{password}", async (req, res) => {
    try {
        user.login(req.body);
    } catch (err) {
        res.status(400).json({ mesg: err });
    }
});

// route for getting all users, must be authorized ideally
router.get("/allusers", async (req, res) => {
    try {
        const get = await user.getAllUsers();
        get.forEach((acc) => {
            res.write(acc.email);
            res.write("\n");
        });
        res.status(201).send();
    } catch (e) {
        // res.status(400).json({ msg: error });
        console.log(e);
        res.status(400).send(e.msg);
    }
});

// route for registering a user
router.post("/signup", async (req, res) => {
    try {
        console.log("signing up");
        console.log(req.body);
        post = await user.signup(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// route for deleting a user account
router.delete("/removeuser", async (req, res) => {
    try {
        deleted = await user.deleteUser(req.body);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.delete("/deleteallusers", async (req, res) => {
    console.log("attempting to delete all");
    try {
        await user.deleteAllUsers();
        res.status(200).send("deleted all users. hope this was not a mistake");
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

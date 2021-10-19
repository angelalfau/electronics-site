const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
var user = require("../service/user");

router.get("/user/{email}/{password}", async (req, res) => {
    try {
        user.login(req.body);
    } catch (err) {
        res.status(400).json({ mesg: err });
    }
});

// route for getting all users, must be authorized
router.get("/allusers", async (req, res) => {
    try {
        user.getAllUsers();
    } catch (e) {
        // res.status(400).json({ msg: error });
        res.status(400).send(e.msg);
    }
});

// route for registering a user
router.post("/signup", async (req, res) => {
    try {
        post = await user.signup(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// route for deleting a user account
router.delete("/removeuser", async (req, res) => {
    try {
        deleted = user.deleteUser(req.body);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;

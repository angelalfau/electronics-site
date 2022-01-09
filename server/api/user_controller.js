const express = require("express");
const router = express.Router();
const user = require("../service/user");
var path = require("path");
const jwt = require("jsonwebtoken");

// route for logging in
router.post("/login", async (req, res) => {
    try {
        console.log("logging in");
        console.log(req.body);
        [errors, post] = await user.login(req.body);

        if (errors) {
            console.log("found errors");
            console.log(post);
            res.status(200).json({ errors: post });
        } else {
            console.log("no errors found");
            jwt.sign(
                {
                    id: post.id,
                    name: post.name,
                    email: post.email,
                },
                "secret",
                {
                    expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                    });
                }
            );
            // res.status(201).json(post);
        }
    } catch (error) {
        console.log("caught error : " + error);
        res.status(400).json(error.message);
    }
});

// route for registering a user
router.post("/signup", async (req, res) => {
    try {
        console.log("signing up");
        console.log(req.body);
        [errors, post] = await user.signup(req.body);

        if (errors) {
            console.log("found errors");
            console.log(post);
            res.status(200).json({ errors: post });
        } else {
            res.status(201).json(post);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// route for getting all users, must be authorized ideally
router.get("/allusers", async (req, res) => {
    try {
        const get = await user.getAllUsers();
        get.forEach((acc) => {
            res.write(acc.email + " : " + acc.password);
            res.write("\n");
        });
        res.status(201).send();
    } catch (e) {
        // res.status(400).json({ msg: error });
        console.log(e);
        res.status(400).send(e.msg);
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

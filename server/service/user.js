const express = require("express");
const { userInfo } = require("os");
const User = require("../models/User");
const instance = require("./axios.js");

const login = () => {
    res.status(200).send("uwu login feature");
};

// register a new user
// check if email is alrdy signed up
const signup = async (body) => {
    const newUser = new User(body);
    const post = await newUser.save();
    return post;
};

// delete a user given email and authorization
// must either be admin or user being deleted
const deleteUser = async (body) => {
    const deleted = findOneAndDelete({ email: body.email });
    return deleted;
};

// retrieve JSON's of all users
// for admin purposes
const getAllUsers = async () => {
    const ret = await User.find({});
    return ret;
};

const deleteAllUsers = async () => {
    User.deleteMany({}, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });
};

exports.login = login;
exports.signup = signup;
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
exports.deleteAllUsers = deleteAllUsers;

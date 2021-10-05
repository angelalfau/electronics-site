const express = require("express");
const router = express.Router();
// app.use("/*", router);
const Posts = require("../models/Posts");

router.get("/", async (req, res) => {
    res.send("Hello");
    // try {
    //     const posts = await Posts.find();
    //     if (!posts) throw Error("No Items");
    //     res.status(200).json(posts);
    // } catch (err) {
    //     res.status(400).json({ mesg: err });
    // }
});

// router.post("/signup", async (req, res) => {
//     const newPost = new Posts(req.body);
//     try {
//         const post = await newPost.save();
//         if (!post) throw Error("Something went wrong with the post");
//         res.status(200).json(post);
//     } catch {
//         res.status(400).json({ msg: error });
//     }
// });

module.exports = router;

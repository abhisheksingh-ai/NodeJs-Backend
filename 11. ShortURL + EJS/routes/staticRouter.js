//Home page ka UI 
const express = require("express");
const router = express.Router();
const URL = require("../models/url.js");

router.use("/", async(req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls : allUrls,
    });
})

module.exports = router;
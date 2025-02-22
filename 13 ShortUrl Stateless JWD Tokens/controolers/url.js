const URL = require("../models/url");
const shortid = require("shortid");

async function handleGetAllUrl(req, res) {
    try {
        const result = await URL.find({});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Unable to get all urls" });
    }
}

async function handlePostNewUrl(req, res) {
    try {
        const body = req.body;
        if (!body.url) {
            return res.status(404).json({ msg: "require a url" });
        }
        const id = shortid();
        await URL.insertOne({
            shortUrl: id,
            redirectUrl: body.url,
            analytics: [],
            createdBy: req.user._id,
        });
        return res.render("home", {
            id: id
        });
    } catch (error) {
        res.status(500).json({ message: "unable to post new url" });
    }
}

async function handleGetRequest(req, res) {
    try {
        const id = req.params.id;
        const result = await URL.findOneAndUpdate(
            { shortUrl: id },
            {
                $push: { analytics: { creationTime: Date.now() } }
            },
            { new: true }
        );
    
        if (!result) {
            return res.status(404).json({ msg: `URL Id does not exists` });
        }
        const redirectUrl = result.redirectUrl;
        return res.status(302).redirect(redirectUrl);       
    } catch (error) {
        return res.status(404).json({ msg: "unable to redirect url" });
    }
}

async function handleGetAnalyticWithId(req,res) {
    try {
        const id = req.params.id;
        const result = await URL.findOne(
            {shortUrl : id}
        )
        const noOfClicks = result.analytics.length;
        return res.status(200).json({msg: `no of clicks is: ${noOfClicks}`})
    } catch (error) {
        return res.status(400).json({ message: "unable to get analytics from id" });
    }
}

module.exports = {
    handleGetAllUrl,
    handlePostNewUrl,
    handleGetRequest,
    handleGetAnalyticWithId,
}
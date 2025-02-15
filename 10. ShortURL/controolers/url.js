const URL = require("../models/url");
const shortid = require("shortid");

async function handleGetAllUrl(req, res) {
    try {
        const result = await URL.find({});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: "Unable to get all urls" });
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
        });
        res.status(200).json({msg: "new short id created"})
    } catch (error) {
        res.status(400).json({ message: "unable to post new url" });
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
            res.status(404).json({ msg: `URL Id does not exists` });
        }
        const redirectUrl = result.redirectUrl;
        res.status(302).redirect(redirectUrl);       
    } catch (error) {
        res.status(404).json({ msg: "unable to redirect url" });
    }
}

async function handleGetAnalyticWithId(req,res) {
    try {
        const id = req.params.id;
        const result = await URL.findOne(
            {shortUrl : id}
        )
        const noOfClicks = result.analytics.length;
        res.status(200).json({msg: `no of clicks is: ${noOfClicks}`})
    } catch (error) {
        res.status(400).json({ message: "unable to get analytics from id" });
    }
}

module.exports = {
    handleGetAllUrl,
    handlePostNewUrl,
    handleGetRequest,
    handleGetAnalyticWithId,
}
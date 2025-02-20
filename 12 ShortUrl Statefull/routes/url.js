const express = require("express");
const urlRouter = express.Router();
const {
    handleGetAllUrl,
    handlePostNewUrl,
    handleGetRequest,
    handleGetAnalyticWithId
} = require("../controolers/url");

urlRouter.route("/").
    get(handleGetAllUrl).
    post(handlePostNewUrl);

urlRouter.route("/:id").
    get(handleGetRequest);

urlRouter.route("/analytics/:id").
    get(handleGetAnalyticWithId);

module.exports = {urlRouter};

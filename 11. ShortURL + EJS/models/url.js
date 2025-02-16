const mongoose = require("mongoose");

//Structure of URL Schema
const urlSchema = mongoose.Schema({
    shortUrl: {
        type: String,
        unique: true,
        index: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    analytics: [
        {
            creationTime: {
                type: Date,
                default: Date.now()
            }
        }
    ]
}, { timestamps: true });

//creation of our model
const URL = mongoose.model("url", urlSchema);
module.exports = URL;
const mongoose = require("mongoose");

async function connectMngoDb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMngoDb,
};
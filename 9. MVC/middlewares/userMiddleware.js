const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\nTime: ${Date.now()},IP: ${req.ip} ,Path: ${req.path}`,
            (err, data) => {
                next();
            }
        );
    };
}

module.exports = {
    logReqRes
}
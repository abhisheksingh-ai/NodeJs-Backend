const fs = require("fs");

function reqResLog(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n Date: ${Date.now()}, Path: ${req.path}`,
            (err, data) => {
                next();
            }
        )
    }
}

module.exports = {
    reqResLog,
}
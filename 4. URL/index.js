const http = require('http');
const path = require('path');
const url = require("url")
const fs = require("fs");

const PORT = 4001;

const myServer = http.createServer((req, res) => {

    if (req.url == "/favicon.ico") return res.end();

    const parsedReqObj = url.parse(req.url, true);
    const pathName = parsedReqObj.pathname;

    const logData = `\nReq received at time: ${Date.now()}, Path: ${pathName}`;

    fs.appendFile("./log.txt", logData, (err) => {
        if (err) throw err;
    });

    switch (pathName) {
        case "/": 
            res.end("Home Page Loading...");
            break;
        case "/about":
            const userName = parsedReqObj.query.name;
            res.end(`Hey ${userName}...`)
            break;
        default:
            res.end("Error 404");
    }
    
});

myServer.listen(PORT, () => console.log(`Welcom on server: ${PORT}`));
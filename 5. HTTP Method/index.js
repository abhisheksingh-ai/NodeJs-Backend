const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 4002;

const myServer = http.createServer((req, res) => {
    if (req.url == "./favicon.ico") return res.end();
    const myUrlObj = url.parse(req.url, true);
    const pathName = myUrlObj.pathname;

    switch (pathName) {
        case "/":
            res.end("Home page loading...");
            break;
        case "/Signup":
            if (req.method == 'GET') {
                res.end("Signup Page load...");
            } else if (req.method == 'POST') {
                //data send to database and stored
                res.end("Signup Successfull");
            } else if (req.method == 'PUT') {
                //image put
                res.end("Image uploaded successfull")
            }
        default:
            res.end("404 Error Page not exist");
    }

    //So for particular path we can have max to max 5 methods
    //It makes code bulky so we will use Express Framework
})
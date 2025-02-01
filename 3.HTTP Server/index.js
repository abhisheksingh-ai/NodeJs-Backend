const http = require('http');
const PORT = 4000;

const myServr = http.createServer((req, res) => {
    const path = req.url;
    if (path === "/") {
        console.log("I am on Home Page");
        res.end("Home page loading...");
    } else if (path == "/about") {
        res.end("I am Abhishek Singh");
    } else {
        res.end("404 Error");
    }
});

myServr.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
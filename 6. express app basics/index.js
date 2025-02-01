const express = require("express");
const app = express();
const PORT = 4003;

app.get("/", (req, res) => {
    res.end("Home page load...");
})

app.get("/about", (req, res) => {
    res.end("hey " + req.query?.name);
})

app.listen(PORT, ()=> console.log(`Server started at ${PORT}`));
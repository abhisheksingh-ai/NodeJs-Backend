const express = require("express");
const { connectMongoDB } = require("./connection");
const { reqResLog } = require("./middelwares/urlMiddlewares");
const { urlRouter } = require("./routes/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 3002;

//connection with mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/shortIdDatabase").
    then(() => {
        console.log(`MongoDb Connected`);
    }).
    catch((err) => {
        console.log("Mongo Error", err);
    })

//ejs set
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //all ejs are in views

//middleware plugin 
app.use(express.json());
app.use(reqResLog("log.txt"));
app.use(express.urlencoded({ extended: false }));



//routes
app.use("/api/url", urlRouter);
app.use("/", staticRoute);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
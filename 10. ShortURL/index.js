const express = require("express");
const { connectMongoDB } = require("./connection");
const { reqResLog } = require("./middelwares/urlMiddlewares");
const { urlRouter } = require("./routes/url");

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

//middleware plugin 
app.use(express.json());
app.use(reqResLog("log.txt"));

//routes
app.use("/api/url", urlRouter);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
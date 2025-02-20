const express = require("express");
const { connectMongoDB } = require("./connection");
const { reqResLog } = require("./middelwares/urlMiddlewares");
const { urlRouter } = require("./routes/url");
const path = require("path");
const staticRouter = require("./routes/static");
const userRouter = require("./routes/user");
const { restrictToLogedInUser , checkAuth} = require("./middelwares/auth");
const cookieParser = require("cookie-parser");

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//for view
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

//routes
app.use("/", checkAuth ,staticRouter);
app.use("/api/url",restrictToLogedInUser, urlRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
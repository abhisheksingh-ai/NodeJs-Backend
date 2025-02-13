//require all things that need
const express = require("express");
const { connectMngoDb } = require("./connection");
const { logReqRes } = require("./middlewares/userMiddleware");
const { userRouter } = require("./routes/userRoutes");


const app = express();
const PORT = 1000;
//making connection with mongodb
connectMngoDb("mongodb://127.0.0.1:27017/mySecondDatabase").
    then(() => {
        console.log("MongoDb Connected");
    }).
    catch((err) => {
        console.log("MongoDb Error:", err);
    })

//middleware plugin
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users", userRouter);

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));
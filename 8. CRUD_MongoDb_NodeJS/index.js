const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 2000;

//connection mongodb to our code 
mongoose.
    connect('mongodb://127.0.0.1:27017/myFirstDatabase')
    .then(() => console.log("Data base connected")).
    catch((err)=> console.log("Mongo Error: ", err))
//making schema -> Structure
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    jobTitle: {
        type: String
    }
});
//making model from this schema
const Users = mongoose.model("user", UserSchema);

//middleware to parse form data into request body
app.use(express.urlencoded({ extended: true }));

//making routs
//routs:  "/api/users"
app.
    route("/api/users").
    get(async(req, res) => {
        const result = await Users.find({});
        res.status(200).json(result); 
    }).
    post(async(req, res) => {
        const body = req.body;
        if (!body.first_name | !body.email | !body.last_name | !body.gender | !body.job_title) {
            res.status(404).end("All fields are required");
        }
        await Users.insertOne({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        })
        res.status(201).json({ msg: "success" });
    });


//routs:  "/api/users/:id"
app.
    route("/api/users/:id").
    get(async (req, res) => {
        const id = req.params.id;
        const result = await Users.findOne({ _id: id});
        if (!result) {
            res.status(404).end("user not found");
        }
        res.status(200).json(result);
    }).
    patch(async(req, res) => {
        const id = req.params.id;
        await Users.findOneAndUpdate({ _id: id }, { email: 'newemial.com' });
        res.status(200).json({ msg: "Success" });
    }).
    delete(async(req, res) => {
        const id = req.params.id;
        await Users.findOneAndDelete({ _id: id }, { email: 'newemial.com' });
        res.status(200).json({ msg: "Success" });
    })

app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`));

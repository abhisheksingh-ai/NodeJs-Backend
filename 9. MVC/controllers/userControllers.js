const User = require("../models/user")

async function handleGetAllUsers(req,res) {
    const result = await User.find({});
    res.status(200).json(result); 
}

async function handlePostNewUser(req, res) {
    const body = req.body;
    if (!body.first_name | !body.email | !body.last_name | !body.gender) {
        res.status(404).end("All fields are required");
    }
    await User.insertOne({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
    })
    res.status(201).json({ msg: "success" });   
}

async function handleGetUserById(req, res) {
    const id = req.params.id;
    const result = await User.findOne({ _id: id});
    if (!result) {
        res.status(404).end("user not found");
    }
    res.status(200).json(result);   
}

async function handleUpdateUserById(req, res) {
    const id = req.params.id;
    await User.findOneAndUpdate({ _id: id }, { email: 'newemial.com' });
    res.status(200).json({ msg: "Success" });
}

async function handleDeleteUserById(req, res) {
    const id = req.params.id;
    await User.findOneAndDelete({ _id: id }, { email: 'newemial.com' });
    res.status(200).json({ msg: "Success" });
}

module.exports = {
    handleGetAllUsers,
    handlePostNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
}


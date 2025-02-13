const mongoose = require("mongoose");

//making structure of schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;

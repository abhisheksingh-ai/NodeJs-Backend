const express = require("express");
const userRouter = express.Router();

const { handleGetAllUsers,
    handlePostNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
} = require("../controllers/userControllers");

userRouter.
    route("/").
    get(handleGetAllUsers).
    post(handlePostNewUser)

userRouter.
    route("/:id").
    get(handleGetUserById).
    patch(handleUpdateUserById).
    delete(handleDeleteUserById)

module.exports = { userRouter };
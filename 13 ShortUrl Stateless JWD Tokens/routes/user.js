const express = require("express");
const router = express.Router();

const { handleSignUp, handleUserLogIn } = require("../controolers/user");

router.post("/", handleSignUp);
router.post("/login", handleUserLogIn);

module.exports = router;
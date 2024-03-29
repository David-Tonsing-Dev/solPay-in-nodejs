const express = require("express");
const userRouter = express.Router();
const { signup } = require("../controllers/userControllers");

userRouter.post("/signup", signup);

module.exports = userRouter;

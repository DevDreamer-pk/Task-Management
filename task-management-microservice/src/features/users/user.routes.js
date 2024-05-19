import express from "express";
import userController from "./user.controller.js"
const userRouter = express.Router();

userRouter.post("/register", new userController().registerUser) 
userRouter.post("/login", new userController().login)

export default userRouter
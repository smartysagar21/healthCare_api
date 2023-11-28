import express from "express";
import {
  getAllUsers,
  login,
  logout,
  register,
} from "../controllers/user-controllers";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;

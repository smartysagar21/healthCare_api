import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import cookieParser from "cookie-parser";
import blogRouter from "./routes/blog-routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/", (req, res, next) => {
  res.send("Hello From Kubree");
});

//1EGAaw2PvSST0DcZ
mongoose
  .connect(
    "mongodb+srv://admin:1EGAaw2PvSST0DcZ@cluster0.6p5zri0.mongodb.net/healthCare?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("connected to DATABASE and listening to localhost 5000")
  )
  .catch((err) => console.log(err));

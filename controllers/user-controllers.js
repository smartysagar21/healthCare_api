import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ users });
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim === "" || !email || email.trim() === "" || !password) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({ email, name, password: hashedPassword, blogs: [] });
    await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  const token = jwt.sign({ _id: user._id }, "jamshedpur");

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({ success: true, message: "Account Created Succesfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email.trim() === "" || password.length < 6) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User does not Exist" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }

  const token = jwt.sign({ _id: existingUser._id }, "jamshedpur");

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      id: existingUser._id,
      message: "Logged In Successfully",
    });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

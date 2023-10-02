const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const UserModel = require("./db/models/User");

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({}));

mongoose.connect("mongodb://localhost:27017/VFM");

app.post("/signUp", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let getUser = await UserModel.findOne({
    email: req.body.email,
  });
  if (getUser) {
    res.json({
      message: "This email is already exist. Please use another email.",
    });
  } else {
    let createUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json({ message: "User created successfully..", data: createUser });
  }
});

app.post("/login", async (req, res) => {
  const getUser = await UserModel.findOne({ email: req.body.email });

  if (!getUser) {
    res.json({
      message: "This email is not found. Please sign up.",
    });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      getUser.password
    );
    if (validPassword) {
      res.json({
        message: "Welcome! You have successfully logged in",
      });
    } else {
      res.json({ message: "Invalid password" });
    }
  }
});

app.get("/getAllUser", async (req, res) => {
  await UserModel.find({})
    .then((users) => res.json({ data: users }))
    .catch((err) => res.json(err));
});

app.post("/getUser", async (req, res) => {
  try {
    const getUser = await UserModel.findOne({ _id: req.body._id });

    if (!getUser) {
      return res.json({
        message: "User not found",
      });
    }
    res.json({ data: getUser });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on 3001 port.");
});

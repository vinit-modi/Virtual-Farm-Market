const bcrypt = require("bcrypt");
const UserModel = require("../../../db/models/User");

module.exports = {
  signUp: async (req, res) => {
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
  },

  login: async (req, res) => {
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
  },

  getAllUser: async (req, res) => {
    await UserModel.find({})
      .then((users) => res.json({ data: users }))
      .catch((err) => res.json(err));
  },

  getUser: async (req, res) => {
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
  },
};

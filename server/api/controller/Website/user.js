const bcrypt = require("bcrypt");
const UserModel = require("../../../db/models/User");
const CityModel = require("../../../services/insertCities");
const ProvinceModel = require("../../../services/insertProvinces");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../../uploads/profilePicture");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  signUp: async (req, res) => {
    const validationRules = [
      check("name").notEmpty().withMessage("Name must be provided"),
      check("email")
        .notEmpty()
        .withMessage("Email must be provided")
        .isEmail()
        .withMessage("Invalid email format"),
      check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      check("phoneNumber")
        .notEmpty()
        .withMessage("Phone Number must be provided"),
      check("city").notEmpty().withMessage("City must be provided"),
      check("province").notEmpty().withMessage("Province must be provided"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

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
    const validationRules = [
      check("email")
        .notEmpty()
        .withMessage("Email must be provided")
        .isEmail()
        .withMessage("Invalid email format"),
      check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

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
        let jwtToken = {
          _id: getUser._id,
          email: req.body.email,
        };

        let accessToken = jwt.sign(jwtToken, config.secret, {
          expiresIn: config.jwtExpirationTime,
        });
        const getUpdatedUser = await UserModel.findByIdAndUpdate(
          { _id: getUser._id },
          { accessToken },
          { new: true }
        );
        res.json({
          message: "Welcome! You have successfully logged in",
          data: getUpdatedUser,
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
    const validationRules = [
      check("_id").notEmpty().withMessage("_id must be provided"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    try {
      const getUser = await UserModel.findOne({ _id: req.body._id });

      if (!getUser) return res.json({ message: "User not found" });
      res.json({ data: getUser });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getAllCityNames: async (req, res) => {
    await CityModel.find({})
      .sort({ name: 1 })
      .then((cities) => res.json({ data: cities }))
      .catch((err) => res.json(err));
  },

  getAllProvinceNames: async (req, res) => {
    await ProvinceModel.find({})
      .sort({ name: 1 })
      .then((provinces) => res.json({ data: provinces }))
      .catch((err) => res.json(err));
  },

  changePassword: async (req, res) => {
    const validationRules = [
      check("currentPassword")
        .notEmpty()
        .withMessage("Current password must be provided"),
      check("newPassword")
        .notEmpty()
        .withMessage("New Password must be provided")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    let getUser = await UserModel.findOne({
      _id: req.userInfo._id,
    });
    if (getUser) {
      const validPassword = await bcrypt.compare(
        req.body.currentPassword,
        getUser.password
      );
      if (validPassword) {
        await UserModel.findByIdAndUpdate({
          _id: req.userInfo._id,
        }).set({ password: hashedPassword });
        res.json({
          message: "Password changed successfully",
        });
      } else {
        res.json({
          message: "Your current password did not match",
        });
      }
    } else {
      res.json({
        message: "Something went wrong (User not found)",
      });
    }
  },

  updateProfile: async (req, res) => {
    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      try {
        if (req.file) {
          req.body.profilePicture = req.file.path;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
          req.userInfo._id,
          req.body,
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({
          message: "Profile updated successfully",
          data: updatedUser,
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          error: error.message,
        });
      }
    });
  },
};

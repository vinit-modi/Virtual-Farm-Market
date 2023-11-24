const bcrypt = require("bcrypt");
const UserModel = require("../../../db/models/User");
const CmsModel = require("../../../db/models/Cms");
const CityModel = require("../../../services/insertCities");
const ProvinceModel = require("../../../services/insertProvinces");
const NotificationModel = require("../../../db/models/Notification");
const FaqModel = require("../../../db/models/Faq");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");
const jwt = require("jsonwebtoken");
const upload = require("../../../utils/uploadImage");
const sendEmail = require("../../../utils/sendEmail");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const emailTemplatePath = path.join(
  __dirname,
  "../../../utils/emailTemplate.html"
);
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");
const notificationContent = require("../../../utils/notificationContent");
const profilePictureUpload = upload("../uploads/profilePicture/");
const stripe = require("stripe")(config.stripeSecretKey);

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
      isEmailConfirmed: true,
    });
    if (getUser) {
      res.json({
        message: "This email is already exist. Please use another email.",
      });
    } else {
      const confirmationToken = crypto.randomBytes(20).toString("hex");
      let createUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
        emailConfirmationToken: confirmationToken,
      });

      const mailOptions = {
        from: config.email,
        to: req.body.email,
        subject: "Confirm Your Email",
        html: emailTemplate.replace("${confirmationToken}", confirmationToken),
      };
      sendEmail(createUser.email, mailOptions);

      await NotificationModel.create({
        userId: createUser._id,
        title: notificationContent.WelcomeTitle,
        content: notificationContent.WelcomeContent,
      });

      res.json({
        message:
          "User created successfully. Check your email for confirmation.",
        data: createUser,
      });
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

    const getUser = await UserModel.findOne({
      email: req.body.email,
      isEmailConfirmed: true,
    });

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
        if (!getUser.stripeCustomerId) {
          const stripeCustomer = await stripe.customers.create({
            email: req.body.email,
            phone: getUser.phoneNumber,
          });

          await UserModel.findByIdAndUpdate(
            { _id: getUser._id },
            { stripeCustomerId: stripeCustomer.id },
            { new: true }
          );
        }

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
        res.status(404).json({
          message: "Your current password did not match",
        });
      }
    } else {
      res.status(404).json({
        message: "Something went wrong (User not found)",
      });
    }
  },

  updateProfile: async (req, res) => {
    profilePictureUpload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      try {
        if (req.file) {
          req.body.profilePicture =
            `${config.projectUrl}uploads/profilePicture/` + req.file.filename;
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

  confirmEmail: async (req, res) => {
    const token = req.body.token;
    const validationRules = [
      check("token").notEmpty().withMessage("Token must be provided"),
    ];

    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    try {
      const user = await UserModel.findOne({ emailConfirmationToken: token });

      if (!user) {
        return res.json({
          message: "Something is wrong with your token",
        });
      }
      await UserModel.findByIdAndUpdate(
        {
          _id: user._id.toString(),
        },
        { isEmailConfirmed: true }
      );
      res.json({
        message: "Email confirmed successfully.",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getCmsForUser: async (req, res) => {
    try {
      const validationRules = [
        check("titleKey").notEmpty().withMessage("titleKey must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getCms = await CmsModel.findOne({ titleKey: req.body.titleKey });
      if (!getCms) {
        return res.status(404).json({
          status: "error",
          message: "CMS not found",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "CMS details",
          data: getCms,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getAllFaqForUser: async (req, res) => {
    try {
      let getAllFaq = await FaqModel.find({});
      return res.status(200).json({
        status: "success",
        message: "List of all FAQs",
        data: getAllFaq,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getUserImage: async (req, res) => {
    try {
      let getImage = await UserModel.findOne({
        _id: req.userInfo._id,
      });
      return res.status(200).json({
        status: "success",
        message: "User profile image",
        data: getImage.profilePicture,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

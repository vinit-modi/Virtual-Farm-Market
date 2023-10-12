const AdminModel = require("../../../db/models/adUser");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const UserModel = require("../../../db/models/User");

module.exports = {
  adLogin: async (req, res) => {
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

    const getUser = await AdminModel.findOne({ email: req.body.email });

    if (!getUser) {
      res.json({
        message: "This email is not found. Please sign up.",
      });
    } else {
      const validPassword = await AdminModel.findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (validPassword) {
        res.json({
          message: "Welcome! You have successfully logged in",
          data: getUser,
        });
      } else {
        res.json({ message: "Invalid email or password." });
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

  deleteUser: async (req, res) => {
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

      if (!getUser) {
        return res.json({ message: "User not found" });
      } else {
        await UserModel.deleteOne({ _id: req.body._id });
        res.json({ message: "User deleted successfully." });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  changePassword: async (req, res) => {
    const validationRules = [
      check("_id").notEmpty().withMessage("_id must be provided"),
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

    let getUser = await AdminModel.findOne({
      _id: req.body._id,
      password: req.body.currentPassword,
    });
    if (getUser) {
      await AdminModel.findByIdAndUpdate({
        _id: req.body._id,
      }).set({ password: req.body.newPassword });
      res.json({
        message: "Password changed successfully",
      });
    } else {
      res.json({
        message: "Your current password did not match",
      });
    }
  },

  getAdminProfile: async (req, res) => {
    const validationRules = [
      check("_id").notEmpty().withMessage("_id must be provided"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    try {
      const getAdmin = await AdminModel.findOne({ _id: req.body._id });

      if (!getAdmin) return res.json({ message: "Admin not found" });
      res.json({ data: getAdmin });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateAdminProfile: async (req, res) => {
    const validationRules = [
      check("_id").notEmpty().withMessage("_id must be provided"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    try {
      const getAdmin = await AdminModel.findOne({ _id: req.body._id });

      if (!getAdmin) return res.json({ message: "Admin not found" });
      else {
        const updateAdmin = await AdminModel.findByIdAndUpdate(
          { _id: req.body._id },
          { ...req.body },
          { new: true }
        );
        res.json({
          message: "Admin profile updated successfully",
          data: updateAdmin,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

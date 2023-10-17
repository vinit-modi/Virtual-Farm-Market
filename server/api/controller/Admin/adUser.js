const AdminModel = require("../../../db/models/adUser");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const UserModel = require("../../../db/models/User");
const bcrypt = require("bcrypt");
const upload = require("../../../utils/uploadImage");

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
      const validPassword = await bcrypt.compare(
        req.body.password,
        getUser.password
      );

      if (validPassword) {
        res.json({
          message: "Welcome! You have successfully logged in",
          data: getUser,
        });
      } else {
        res.json({ message: "Invalid password." });
      }
    }
  },

  getAllUser: async (req, res) => {
    // const page = parseInt(req.body.page) || 1;
    // const limit = parseInt(req.body.limit) || 10;
    // const sortField = req.body.sortField || "name";
    // const sortOrder = req.body.sortOrder || "asc";
    const search = req.body.search || "";

    try {
      // const skip = (page - 1) * limit;
      // const sort = {};
      // sort[sortField] = sortOrder === "desc" ? -1 : 1;

      const searchFilter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };

      const users = await UserModel.find(searchFilter);
      // .skip(skip)
      // .limit(limit)
      // .sort(sort);

      res.json({ data: users });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
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
    });
    if (!getUser) {
      res.json({
        message: "User not found",
      });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.currentPassword,
        getUser.password
      );
      if (validPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        await AdminModel.findByIdAndUpdate({
          _id: req.body._id,
        }).set({ password: hashedPassword });
        res.json({
          message: "Password changed successfully",
        });
      } else {
        res.json({
          message: "Your current password did not match",
        });
      }
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

  updateUserProfile: async (req, res) => {
    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      try {
        if (req.file) {
          req.body.profilePicture = req.file.path;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
          req.body._id,
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

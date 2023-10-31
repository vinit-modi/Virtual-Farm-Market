const NotificationModel = require("../../../db/models/Notification");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");

module.exports = {
  getAllNotification: async (req, res) => {
    try {
      let getAllNotification = await NotificationModel.find({
        userId: req.userInfo._id,
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        status: "success",
        message: "All Notification.",
        data: getAllNotification,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

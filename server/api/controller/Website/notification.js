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

  getNotification: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getNotification = await NotificationModel.findOne({
        _id: req.body._id,
      });
      if (!getNotification) {
        return res.status(404).json({
          status: "error",
          message: "Notification not found",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "Notification details",
          data: getNotification,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

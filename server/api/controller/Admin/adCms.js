const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const CmsModel = require("../../../db/models/Cms");

module.exports = {
  getAllCms: async (req, res) => {
    try {
      let getAllCms = await CmsModel.find({});
      return res.status(200).json({
        status: "success",
        message: "List of all CMS",
        data: getAllCms,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getSpecificCms: async (req, res) => {
    try {
      const validationRules = [
        check("titleKey").notEmpty().withMessage("Title Key must be provided"),
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

  updateCms: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getCms = await CmsModel.findOne({ _id: req.body._id });
      if (!getCms) {
        return res.status(404).json({
          status: "error",
          message: "CMS not found",
        });
      } else {
        let updateCms = await CmsModel.findByIdAndUpdate(
          { _id: req.body._id },
          req.body,
          { new: true }
        );
        return res.status(200).json({
          status: "success",
          message: "CMS details updated successfully",
          data: updateCms,
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

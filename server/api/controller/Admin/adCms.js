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
};

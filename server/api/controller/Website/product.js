const UnitModel = require("../../../db/models/Unit");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");

module.exports = {
  getAllUnits: async (req, res) => {
    try {
      let getAllUnits = await UnitModel.find({});
      console.log(getAllUnits);
      return res.status(200).json({
        status: "success",
        message: "All Units.",
        data: getAllUnits,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

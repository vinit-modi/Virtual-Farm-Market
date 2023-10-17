const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const CategoryModel = require("../../../db/models/Category");

module.exports = {
  addCategory: async (req, res) => {
    const validationRules = [
      check("name").notEmpty().withMessage("Name must be provided"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    let getCategory = await CategoryModel.findOne({ name: req.body.name });
    if (getCategory) {
      return res.status(409).json({
        status: "error",
        message: "Category already exists",
      });
    } else {
      let createCategory = await CategoryModel.create({ name: req.body.name });
      return res.status(200).json({
        status: "success",
        message: "Category created successfully.",
        data: createCategory,
      });
    }
  },
};

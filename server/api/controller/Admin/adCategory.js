const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const CategoryModel = require("../../../db/models/Category");

module.exports = {
  addCategory: async (req, res) => {
    try {
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
        let createCategory = await CategoryModel.create({
          name: req.body.name,
        });
        return res.status(200).json({
          status: "success",
          message: "Category created successfully.",
          data: createCategory,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  editCategory: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getCategory = await CategoryModel.findOne({ _id: req.body._id });
      if (!getCategory) {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      } else {
        let categoryWithSameName = await CategoryModel.findOne({
          _id: { $ne: req.body._id },
          name: req.body.name,
        });
        if (categoryWithSameName) {
          return res.status(409).json({
            status: "error",
            message: "Category already exists",
          });
        } else {
          let updateCategory = await CategoryModel.findByIdAndUpdate(
            { _id: req.body._id },
            { name: req.body.name },
            { new: true }
          );
          return res.status(200).json({
            status: "success",
            message: "Category updated successfully.",
            data: updateCategory,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const search = req.body.search || "";
      const searchFilter = {
        $or: [{ name: { $regex: search, $options: "i" } }],
      };
      let getCategories = await CategoryModel.find(searchFilter);
      return res.status(200).json({
        status: "success",
        message: "All categories.",
        data: getCategories,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getCategory: async (req, res) => {
    const validationRules = [
      check("_id").notEmpty().withMessage("_id must be provided"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    try {
      let getCategory = await CategoryModel.findOne({ _id: req.body._id });
      if (!getCategory) {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "Category",
          data: getCategory,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const getCategory = await CategoryModel.findOne({ _id: req.body._id });

      if (!getCategory) {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      } else {
        await CategoryModel.deleteOne({ _id: req.body._id });
        return res.status(200).json({
          status: "success",
          message: "Category deleted successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  changeCategoryStatus: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getCategory = await CategoryModel.findOne({ _id: req.body._id });
      if (!getCategory) {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      } else {
        let updateCategory = await CategoryModel.findByIdAndUpdate(
          { _id: req.body._id },
          { isActive: !getCategory.isActive },
          { new: true }
        );
        return res.status(200).json({
          status: "success",
          message: "Category status updated successfully.",
          data: updateCategory,
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

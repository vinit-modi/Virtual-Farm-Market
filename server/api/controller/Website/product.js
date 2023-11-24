const UnitModel = require("../../../db/models/Unit");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");
const ProductModel = require("../../../db/models/Product");
const upload = require("../../../utils/uploadImage");
const CategoryModel = require("../../../db/models/Category");
const productImagesUpload = upload("../uploads/productImages/");
const { ObjectId } = require("mongodb");
const UserModel = require("../../../db/models/User");

module.exports = {
  getAllUnits: async (req, res) => {
    try {
      let getAllUnits = await UnitModel.find({});
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

  categoriesForProduct: async (req, res) => {
    try {
      let getCategories = await CategoryModel.find({ isActive: true });
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

  addProduct: async (req, res) => {
    productImagesUpload.array("images", 5)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading files" });
      }

      try {
        if (req.files) {
          const images = req.files.map((file) => {
            return `${config.projectUrl}uploads/productImages/` + file.filename;
          });

          req.body.images = images;
        }
        const addProduct = await ProductModel.create({
          ...req.body,
          seller: req.userInfo._id,
        });

        if (!addProduct) {
          return res.status(404).json({ message: "Something Went Wrong" });
        }

        res.json({
          message: "Product Added successfully",
          data: addProduct,
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          error: error.message,
        });
      }
    });
  },

  getAllProducts: async (req, res) => {
    try {
      let getUserLocation = await UserModel.findOne({ _id: req.userInfo._id });
      let getAllProducts = await ProductModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "seller",
            foreignField: "_id",
            as: "seller",
          },
        },
        {
          $unwind: {
            path: "$seller",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $match: { city: getUserLocation.city } },
      ]);
      return res.status(200).json({
        status: "success",
        message: "List of all Products",
        data: getAllProducts,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getProduct: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const objectId = new ObjectId(req.body._id);
      let getProduct = await ProductModel.aggregate([
        {
          $match: {
            _id: objectId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "seller",
            foreignField: "_id",
            as: "seller",
          },
        },
        {
          $unwind: {
            path: "$seller",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return res.status(200).json({
        status: "success",
        message: "Product Details",
        data: getProduct[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getPorductsByCategory: async (req, res) => {
    try {
      let getUserLocation = await UserModel.findOne({ _id: req.userInfo._id });
      let getPorductsByCategory = await ProductModel.aggregate([
        { $match: { category: req.body.categoryName } },
        {
          $lookup: {
            from: "users",
            localField: "seller",
            foreignField: "_id",
            as: "seller",
          },
        },
        {
          $unwind: {
            path: "$seller",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $match: { city: getUserLocation.city } },
      ]);
      return res.status(200).json({
        status: "success",
        message: "List of all Products",
        data: getPorductsByCategory,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

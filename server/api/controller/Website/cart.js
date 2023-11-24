const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const CartModel = require("../../../db/models/Cart");
const mongoose = require("mongoose");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const productId = new mongoose.Types.ObjectId(req.body._id);
      let checkAlreadyExists = await CartModel.findOne({
        user: req.userInfo._id,
        product: productId,
      });
      if (checkAlreadyExists) {
        let updateCart = await CartModel.findByIdAndUpdate(
          checkAlreadyExists._id,
          { $inc: { quantity: 1 } },
          { new: true }
        );
        return res.status(200).json({
          status: "success",
          message: "Quantity updated to Cart.",
          data: updateCart,
        });
      } else {
        let addToCart = await CartModel.create({
          user: req.userInfo._id,
          product: req.body._id,
        });
        return res.status(200).json({
          status: "success",
          message: "Product Added to Cart.",
          data: addToCart,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  removeProduct: async (req, res) => {
    const validationRules = [
      check("_id").notEmpty().withMessage("_Id must be provided"),
    ];
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    try {
      const getProduct = await CartModel.findOne({
        _id: req.body._id,
      });

      if (!getProduct) {
        return res.status(401).json({
          status: "error",
          message: "Product not found.",
        });
      } else {
        await CartModel.deleteOne({
          _id: req.body._id,
        });
        return res.status(200).json({
          status: "success",
          message: "Product removed successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getCartProducts: async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.userInfo._id);
      const getProducts = await CartModel.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            "product.seller": {
              $toObjectId: "$product.seller",
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "product.seller",
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
        message: "Cart details",
        data: getProducts,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  cartItemsCount: async (req, res) => {
    try {
      let getCount = await CartModel.find({
        user: req.userInfo._id,
      }).count();
      return res.status(200).json({
        status: "success",
        message: "Total Cart item count",
        data: getCount,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  decreaseQuantity: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const productId = new mongoose.Types.ObjectId(req.body._id);
      let getProduct = await CartModel.findOne({
        user: req.userInfo._id,
        product: productId,
      });
      if (getProduct) {
        if (getProduct.quantity <= 1) {
          return res.status(400).json({
            status: "error",
            message: "Quantity is already at the minimum.",
          });
        }
        let updateCart = await CartModel.findByIdAndUpdate(
          getProduct._id,
          { $inc: { quantity: -1 } },
          { new: true }
        );
        return res.status(200).json({
          status: "success",
          message: "Quantity updated to Cart.",
          data: updateCart,
        });
      } else {
        return res.status(401).json({
          status: "error",
          message: "Product not found",
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

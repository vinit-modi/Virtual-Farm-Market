const CardModel = require("../../../db/models/Card");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");
const OrderModel = require("../../../db/models/Order");
const mongoose = require("mongoose");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.userInfo._id);
      let getAllOrders = await OrderModel.aggregate([
        {
          $addFields: {
            user: { $toObjectId: "$user" },
          },
        },
        {
          $match: {
            user: userId,
          },
        },
        {
          $unwind: {
            path: "$products",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "products.seller",
            foreignField: "_id",
            as: "products.seller",
          },
        },
        {
          $unwind: {
            path: "$products.seller",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      return res.status(200).json({
        status: "success",
        message: "All order.",
        data: getAllOrders,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getAllOrdersForFarmer: async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.userInfo._id);
      let getAllOrders = await OrderModel.aggregate([
        {
          $unwind: {
            path: "$products",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            "products.seller": userId,
          },
        },
        {
          $lookup: {
            from: "addresses",
            localField: "userAddress",
            foreignField: "_id",
            as: "userAddress",
          },
        },
        {
          $unwind: {
            path: "$userAddress",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      return res.status(200).json({
        status: "success",
        message: "All order.",
        data: getAllOrders,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getSpecificOrder: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const orderId = new mongoose.Types.ObjectId(req.body._id);
      let getAllOrders = await OrderModel.aggregate([
        {
          $match: {
            _id: orderId,
          },
        },
        {
          $unwind: {
            path: "$products",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "products.seller",
            foreignField: "_id",
            as: "products.seller",
          },
        },
        {
          $unwind: {
            path: "$products.seller",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      return res.status(200).json({
        status: "success",
        message: "Order details.",
        data: getAllOrders,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const validationRules = [
        check("orderStatus")
          .notEmpty()
          .withMessage("Order Status must be provided"),
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getOrder = await OrderModel.findById({ _id: req.body._id });
      let updateOrderStatus = await OrderModel.findByIdAndUpdate(
        { _id: req.body._id },
        { orderStatus: req.body.orderStatus },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        message: "All order.",
        data: updateOrderStatus,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

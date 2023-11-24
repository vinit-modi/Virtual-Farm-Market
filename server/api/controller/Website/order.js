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
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },


};

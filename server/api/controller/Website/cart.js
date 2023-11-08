const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");
const { ObjectId } = require("mongodb");
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
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const AddressModel = require("../../../db/models/Address");

module.exports = {
  addNewAddress: async (req, res) => {
    try {
      const validationRules = [
        check("fullName").notEmpty().withMessage("Full Name must be provided"),
        check("phoneNumber")
          .notEmpty()
          .withMessage("Phone Number must be provided"),
        check("address").notEmpty().withMessage("Address must be provided"),
        check("address2")
          .notEmpty()
          .withMessage("Apt, Suit Number must be provided"),
        check("city").notEmpty().withMessage("City must be provided"),
        check("province").notEmpty().withMessage("Province must be provided"),
        check("postalCode")
          .notEmpty()
          .withMessage("Postal Code must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let addNewAddress = await AddressModel.create({
        ...req.body,
        userId: req.userInfo._id,
      });
      return res.status(200).json({
        status: "success",
        message: "Address added successfully.",
        data: addNewAddress,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  editAddress: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
        check("fullName").notEmpty().withMessage("Full Name must be provided"),
        check("phoneNumber")
          .notEmpty()
          .withMessage("Phone Number must be provided"),
        check("address").notEmpty().withMessage("Address must be provided"),
        check("address2")
          .notEmpty()
          .withMessage("Apt, Suit Number must be provided"),
        check("city").notEmpty().withMessage("City must be provided"),
        check("province").notEmpty().withMessage("Province must be provided"),
        check("postalCode")
          .notEmpty()
          .withMessage("Postal Code must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let updateAddress = await AddressModel.findByIdAndUpdate(
        { _id: req.body._id },
        { ...req.body },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "Address updated successfully.",
        data: updateAddress,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  makeDefaultAddress: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const currentDefaultAddress = await AddressModel.findOne({
        defaultAddress: true,
        userId: req.userInfo._id,
      });

      if (currentDefaultAddress) {
        await AddressModel.findByIdAndUpdate(currentDefaultAddress._id, {
          defaultAddress: false,
        });
      }
      const makeDefault = await AddressModel.findByIdAndUpdate(
        req.body._id,
        { defaultAddress: true },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "Address marked default successfully",
        data: makeDefault,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const getAddress = await AddressModel.findOne({
        _id: req.body._id,
      });

      if (!getAddress) {
        return res.status(404).json({
          status: "error",
          message: "Address not found",
        });
      } else {
        await AddressModel.deleteOne({ _id: req.body._id });
        return res.status(200).json({
          status: "success",
          message: "Address deleted successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getAllAddress: async (req, res) => {
    try {
      let getAllAddress = await AddressModel.find({
        userId: req.userInfo._id,
      }).sort({ defaultAddress: -1 });
      return res.status(200).json({
        status: "success",
        message: "All Saved address.",
        data: getAllAddress,
      });
    } catch (error) {
      clg;
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getAddress: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getAddress = await AddressModel.findOne({ _id: req.body._id });
      return res.status(200).json({
        status: "success",
        message: "Address Details.",
        data: getAddress,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const FaqModel = require("../../../db/models/Faq");

module.exports = {
  addFaq: async (req, res) => {
    try {
      const validationRules = [
        check("question").notEmpty().withMessage("Question must be provided"),
        check("answer").notEmpty().withMessage("Answer must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let createNewFaq = await FaqModel.create({
        question: req.body.question,
        answer: req.body.answer,
      });
      return res.status(200).json({
        status: "success",
        message: "FAQ added successfully.",
        data: createNewFaq,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getAllFaq: async (req, res) => {
    try {
      let getAllFaq = await FaqModel.find({});
      return res.status(200).json({
        status: "success",
        message: "List of all FAQs",
        data: getAllFaq,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getSpecificFaq: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getFaq = await FaqModel.findOne({ _id: req.body._id });
      if (!getFaq) {
        return res.status(404).json({
          status: "error",
          message: "FAQ not found",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "FAQ details",
          data: getFaq,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  updateFaq: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getFaq = await FaqModel.findOne({ _id: req.body._id });
      if (!getFaq) {
        return res.status(404).json({
          status: "error",
          message: "FAQ not found",
        });
      } else {
        let updateFaq = await FaqModel.findByIdAndUpdate(
          { _id: req.body._id },
          req.body,
          { new: true }
        );
        return res.status(200).json({
          status: "success",
          message: "FAQ details updated successfully",
          data: updateFaq,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  deleteFaq: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      let getFaq = await FaqModel.findOne({ _id: req.body._id });
      if (!getFaq) {
        return res.status(404).json({
          status: "error",
          message: "FAQ not found",
        });
      } else {
        await FaqModel.findByIdAndDelete({ _id: req.body._id });
        return res.status(200).json({
          status: "success",
          message: "FAQ deleted successfully",
          data: {},
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

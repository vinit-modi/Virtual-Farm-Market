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
};

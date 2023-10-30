const CardModel = require("../../../db/models/Card");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const config = require("../../../config/index");
const encDec = require("../../../services/enDe");

module.exports = {
  addNewCard: async (req, res) => {
    try {
      const validationRules = [
        check("cardNumber")
          .notEmpty()
          .withMessage("Card Number must be provided")
          .isLength({ min: 16 })
          .withMessage("Card number must be 6 characters long"),
        check("cardExpiration")
          .notEmpty()
          .withMessage("Card expiration must be provided"),
        check("cardholderName")
          .notEmpty()
          .withMessage("Card holder name must be provided"),
        check("cvv").notEmpty().withMessage("cvv must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const encrptedCard = encDec.encrypt(req.body.cardNumber);
      let checkCardExist = await CardModel.findOne({
        userId: req.userInfo._id,
        cardNumber: encrptedCard,
      });
      if (checkCardExist) {
        return res.status(409).json({
          status: "error",
          message: "Card already exists",
        });
      } else {
        let addNewCard = await CardModel.create({
          userId: req.userInfo._id,
          cardNumber: encrptedCard,
          lastFourDigits: req.body.cardNumber.slice(-4),
          cardExpiration: req.body.cardExpiration,
          cardholderName: req.body.cardholderName,
          cvv: req.body.cvv,
        });
        return res.status(200).json({
          status: "success",
          message: "Card added successfully.",
          data: addNewCard,
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

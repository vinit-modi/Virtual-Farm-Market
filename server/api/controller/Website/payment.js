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
          .isLength({ min: 15 })
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
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  getAllSavedCards: async (req, res) => {
    try {
      let getAllCards = await CardModel.aggregate([
        { $match: { userId: req.userInfo._id } },
        { $sort: { isCardDefault: -1 } },
      ]);

      getAllCards = getAllCards.map((card) => {
        const decryptedCardNumber = encDec.decrypt(card.cardNumber);
        return {
          ...card,
          cardNumber: decryptedCardNumber,
        };
      });
      return res.status(200).json({
        status: "success",
        message: "All Cards.",
        data: getAllCards,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  deleteCard: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const getCard = await CardModel.findOne({
        _id: req.body._id,
        userId: req.userInfo._id,
      });

      if (!getCard) {
        return res.status(404).json({
          status: "error",
          message: "Card not found",
        });
      } else {
        await CardModel.deleteOne({ _id: req.body._id });
        return res.status(200).json({
          status: "success",
          message: "Card deleted successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  makeDefaultCard: async (req, res) => {
    try {
      const validationRules = [
        check("_id").notEmpty().withMessage("_id must be provided"),
      ];
      await Promise.all(validationRules.map((rule) => rule.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const currentDefaultCard = await CardModel.findOne({
        isCardDefault: true,
        userId: req.userInfo._id,
      });

      if (currentDefaultCard) {
        await CardModel.findByIdAndUpdate(currentDefaultCard._id, {
          isCardDefault: false,
        });
      }
      const makeDefault = await CardModel.findByIdAndUpdate(
        req.body._id,
        { isCardDefault: true },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "Card marked default successfully",
        data: {
          ...makeDefault.toObject(),
          cardNumber: encDec.decrypt(makeDefault.cardNumber),
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

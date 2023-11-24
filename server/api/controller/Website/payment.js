const CardModel = require("../../../db/models/Card");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const encDec = require("../../../services/enDe");
const AddressModel = require("../../../db/models/Address");
const UserModel = require("../../../db/models/User");
const config = require("../../../config/index");

const stripe = require("stripe")(config.stripeSecretKey);

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

  addNewAddress: async (req, res) => {
    try {
      const validationRules = [
        check("fullName").notEmpty().withMessage("Full Name must be provided"),
        check("phoneNumber")
          .notEmpty()
          .withMessage("Phone Number must be provided"),
        check("address").notEmpty().withMessage("Address must be provided"),
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
      let getAllAddress = await AddressModel.find({ userId: req.userInfo._id });
      return res.status(200).json({
        status: "success",
        message: "All Saved address.",
        data: getAllAddress,
      });
    } catch (error) {
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

  stripeAddCard: async (req, res) => {
    try {
      const validationRules = [
        check("stripeToken")
          .notEmpty()
          .withMessage("Stripe token must be provided"),
      ];

      await Promise.all(validationRules.map((rule) => rule.run(req)));

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const user = await UserModel.findOne({ _id: req.userInfo._id });

      const source = await stripe.customers.createSource(
        user.stripeCustomerId,
        {
          source: req.body.stripeToken,
        }
      );

      return res.status(200).json({
        status: "success",
        message: "Card added successfully.",
        data: source,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  stripeGetAllCards: async (req, res) => {
    try {
      const user = await UserModel.findOne({ _id: req.userInfo._id });

      const cards = await stripe.customers.listSources(user.stripeCustomerId, {
        object: "card",
      });

      const isDefaultCard = (card) => user.defaultStripeCard === card.id;

      const cardsWithDefaultFlag = cards.data.map((card) => ({
        ...card,
        isDefaultCard: isDefaultCard(card),
      }));
      return res.status(200).json({
        status: "success",
        message: "All saved cards",
        data: cardsWithDefaultFlag,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  stripeSpecificCard: async (req, res) => {
    try {
      const validationRules = [
        check("cardId").notEmpty().withMessage("Card Id must be provided"),
      ];

      await Promise.all(validationRules.map((rule) => rule.run(req)));

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const user = await UserModel.findOne({ _id: req.userInfo._id });

      const card = await stripe.customers.retrieveSource(
        user.stripeCustomerId,
        req.body.cardId
      );

      const isDefaultCard = user.defaultStripeCard === card.id;

      return res.status(200).json({
        status: "success",
        message: "Specific card details.",
        data: { ...card, isDefaultCard },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  stripeMakeDefaultCard: async (req, res) => {
    try {
      const validationRules = [
        check("cardId").notEmpty().withMessage("Card Id must be provided"),
      ];

      await Promise.all(validationRules.map((rule) => rule.run(req)));

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const user = await UserModel.findOne({ _id: req.userInfo._id });

      await stripe.customers.update(user.stripeCustomerId, {
        default_source: req.body.cardId,
      });

      await UserModel.findByIdAndUpdate(
        { _id: user._id },
        { defaultStripeCard: req.body.cardId },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        message: "Default card updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  stripeDeleteCard: async (req, res) => {
    try {
      const validationRules = [
        check("cardId").notEmpty().withMessage("Card Id must be provided"),
      ];

      await Promise.all(validationRules.map((rule) => rule.run(req)));

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }

      const user = await UserModel.findOne({ _id: req.userInfo._id });

      await stripe.customers.deleteSource(
        user.stripeCustomerId,
        req.body.cardId
      );

      return res.status(200).json({
        status: "success",
        message: "Card deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },

  makePayment: async (req, res) => {
    try {
      const validationRules = [
        check("amount").notEmpty().withMessage("Amount must be provided"),
      ];

      await Promise.all(validationRules.map((rule) => rule.run(req)));

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
      }
      const user = await UserModel.findOne({ _id: req.userInfo._id });

      const paymentIntentOptions = req.body.cardId
        ? { customer: user.stripeCustomerId, payment_method: req.body.cardId }
        : { customer: user.stripeCustomerId };

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.floor(req.body.amount * 100),
        currency: "cad",
        description: "Payment for your order",
        ...paymentIntentOptions,
      });

      return res.status(200).json({
        status: "success",
        message: "Payment successful.",
        data: {
          clientSecret: paymentIntent.client_secret,
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

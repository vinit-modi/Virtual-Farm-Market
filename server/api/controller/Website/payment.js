const CardModel = require("../../../db/models/Card");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const encDec = require("../../../services/enDe");
const CartModel = require("../../../db/models/Cart");
const UserModel = require("../../../db/models/User");
const config = require("../../../config/index");
const OrderModel = require("../../../db/models/Order");
const NotificationModel = require("../../../db/models/Notification");
const sendEmail = require("../../../utils/sendEmail");

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

      let generateOrderNumber = Date.now().toString().slice(-6);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.floor(req.body.amount * 100),
        currency: "cad",
        description: `Payment for order ${generateOrderNumber}`,
        ...paymentIntentOptions,
      });

      let order = await OrderModel.create({
        orderNumber: `ORD-${generateOrderNumber}`,
        user: req.userInfo._id,
        products: JSON.parse(req.body.products),
        amount: req.body.amount,
        paymentIntentId: paymentIntent.id,
        userAddress: req.body.userAddress,
      });

      for (const product of order.products) {
        let getSellerEmail = await UserModel.findOne({ _id: product.seller });
        await NotificationModel.create({
          userId: product.seller,
          title: "New Order Received",
          content: `You have a new order with order number ${order.orderNumber}.`,
        });

        const mailOptions = {
          from: config.email,
          to: getSellerEmail.email,
          subject: "New Order Received",
          text: `You have a new order with order number ${order.orderNumber}.`,
        };
        sendEmail(product.seller, mailOptions);
      }

      await NotificationModel.create({
        userId: req.userInfo._id,
        title: "Order Placed",
        content: `Your order with order number ${order.orderNumber} has been successfully placed.`,
      });

      const mailOptions = {
        from: config.email,
        to: req.userInfo.email,
        subject: "Order Placed",
        text: `Your order with order number ${order.orderNumber} has been successfully placed.`,
      };
      sendEmail(req.userInfo.email, mailOptions);

      await CartModel.deleteMany({ user: req.userInfo._id });

      return res.status(200).json({
        status: "success",
        message: "Order placed successfully",
        data: order,
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

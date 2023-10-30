const mongoose = require("mongoose");

const CreditCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cardNumber: String,
  lastFourDigits: String,
  cardExpiration: String,
  cardType: String,
  cardholderName: String,
  cvv: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CreditCardModel = mongoose.model("CreditCard", CreditCardSchema);

module.exports = CreditCardModel;

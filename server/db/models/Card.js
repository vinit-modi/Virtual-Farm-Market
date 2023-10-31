const mongoose = require("mongoose");
const DS = require("../../services/date");

const CreditCardSchema = new mongoose.Schema({
  userId: String,
  cardNumber: String,
  lastFourDigits: String,
  cardExpiration: String,
  cardholderName: String,
  cvv: String,
  isCardDefault: { type: Boolean, default: false },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

CreditCardSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

CreditCardSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});
const CreditCardModel = mongoose.model("CreditCard", CreditCardSchema);

module.exports = CreditCardModel;

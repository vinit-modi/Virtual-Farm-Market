const mongoose = require("mongoose");
const DS = require("../../services/date");

const CreditCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  cardNumber: String,
  lastFourDigits: String,
  cardExpiration: String,
  cardType: String,
  cardholderName: String,
  cvv: String,
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

CmsSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

CmsSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});
const CreditCardModel = mongoose.model("CreditCard", CreditCardSchema);

module.exports = CreditCardModel;

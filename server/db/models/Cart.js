const mongoose = require("mongoose");
const DS = require("../../services/date");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: { type: Number, default: 1 },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

CartSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

CartSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;

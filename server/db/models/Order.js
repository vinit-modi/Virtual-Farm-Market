const mongoose = require("mongoose");
const DS = require("../../services/date");

const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      seller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      name: String,
      description: String,
      category: String,
      price: Number,
      unit: String,
      images: [],
      quantity: Number,
    },
  ],
  amount: Number,
  paymentIntentId: String,
  orderStatus: { type: String, default: "Placed" },
  userAddress: { type: mongoose.Schema.Types.ObjectId, ref: "address" },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

OrderSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

OrderSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;

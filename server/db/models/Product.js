const mongoose = require("mongoose");
const DS = require("../../services/date");

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  price: { type: Number },
  unit: { type: String },
  quantityAvailable: { type: Number },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: [],
  city: { type: String },
  province: { type: String },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

ProductSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;

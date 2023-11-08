const mongoose = require("mongoose");
const DS = require("../../services/date");

const CategorySchema = new mongoose.Schema({
  name: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

CategorySchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

CategorySchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;

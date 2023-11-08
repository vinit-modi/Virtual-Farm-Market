const mongoose = require("mongoose");
const DS = require("../../services/date");

const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

FaqSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

FaqSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const FaqModel = mongoose.model("faq", FaqSchema);

module.exports = FaqModel;

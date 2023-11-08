const mongoose = require("mongoose");
const DS = require("../../services/date");

const CmsSchema = new mongoose.Schema({
  titleKey: String,
  titleValue: String,
  content: String,
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

const CmsModel = mongoose.model("cms", CmsSchema);

module.exports = CmsModel;

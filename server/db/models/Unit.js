const mongoose = require("mongoose");
const DS = require("../../services/date");

const UnitSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

UnitSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

UnitSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const UnitModel = mongoose.model("unit", UnitSchema);

module.exports = UnitModel;

const mongoose = require("mongoose");
const DS = require("../../services/date");

const NotificationSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

NotificationSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

NotificationSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});
const NotificationModel = mongoose.model("notification", NotificationSchema);

module.exports = NotificationModel;

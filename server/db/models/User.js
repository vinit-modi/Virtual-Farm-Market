const mongoose = require("mongoose");
const DS = require("../../services/date");
const config = require("../../config/index");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  city: String,
  province: String,
  userType: { type: String, default: "Customer" },
  accessToken: { type: String, default: "" },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
  profilePicture: {
    type: String,
    default: `${config.projectUrl}uploads/profilePicture/userImage.jpeg`,
  },
  isEmailConfirmed: { type: Boolean, default: false },
  emailConfirmationToken: { type: String, default: "" },
  stripeCustomerId: { type: String, default: "" },
  defaultStripeCard: { type: String, default: "" },
});

UserSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now();
  }
  this.updatedAt = DS.now();
  next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;

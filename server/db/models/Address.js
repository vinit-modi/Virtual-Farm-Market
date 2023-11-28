const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  phoneNumber: String,
  address: String,
  address2: String,
  city: String,
  province: String,
  postalCode: String,
  defaultAddress: { type: Boolean, default: false },
});

const AddressModel = mongoose.model("address", AddressSchema);

module.exports = AddressModel;

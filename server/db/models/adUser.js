const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
});

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;

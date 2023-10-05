const express = require("express");
const router = express.Router();

const UserController = require("../controller/Website/user");

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);
router.get("/getAllUser", UserController.getAllUser);
router.post("/getUser", UserController.getUser);
router.get("/getAllCities", UserController.getAllCityNames);
router.get("/getAllProvinces", UserController.getAllProvinceNames);
router.post("/changePassword", UserController.changePassword);
router.post("/updateProfile", UserController.updateProfile);

module.exports = router;

const express = require("express");
const router = express.Router();

const UserController = require("../controller/Website/user");
const AdUserController = require("../controller/Admin/adUser");

router.post("/adLogin", AdUserController.adLogin);
router.post("/adGetAllUser", AdUserController.getAllUser);
router.post("/adGetSpecificUser", AdUserController.getUser);
router.post("/deleteUser", AdUserController.deleteUser);
router.post("/changePassword", AdUserController.changePassword);
router.post("/getAdminProfile", AdUserController.getAdminProfile);
router.post("/updateAdminProfile", AdUserController.updateAdminProfile);
router.post("/updateUserProfile", AdUserController.updateUserProfile);

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);
router.get("/getAllUser", UserController.getAllUser);
router.post("/getUser", UserController.getUser);
router.get("/getAllCities", UserController.getAllCityNames);
router.get("/getAllProvinces", UserController.getAllProvinceNames);
router.post("/changePassword", UserController.changePassword);
router.post("/updateProfile", UserController.updateProfile);

module.exports = router;

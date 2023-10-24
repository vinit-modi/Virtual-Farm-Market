const express = require("express");
const router = express.Router();

const UserController = require("../controller/Website/user");
const AdUserController = require("../controller/Admin/adUser");
const AdCategoryController = require("../controller/Admin/adCategory");
const AdFaqController = require("../controller/Admin/adFaq");
const AdCmsController = require("../controller/Admin/adCms");

router.post("/adLogin", AdUserController.adLogin);
router.post("/adGetAllUser", AdUserController.getAllUser);
router.post("/adGetSpecificUser", AdUserController.getUser);
router.post("/deleteUser", AdUserController.deleteUser);
router.post("/changePassword", AdUserController.changePassword);
router.post("/getAdminProfile", AdUserController.getAdminProfile);
router.post("/updateAdminProfile", AdUserController.updateAdminProfile);
router.post("/updateUserProfile", AdUserController.updateUserProfile);

router.post("/addCategory", AdCategoryController.addCategory);
router.post("/editCategory", AdCategoryController.editCategory);
router.post("/getAllCategory", AdCategoryController.getAllCategory);
router.post("/getCategory", AdCategoryController.getCategory);
router.post("/deleteCategory", AdCategoryController.deleteCategory);
router.post("/changeCategoryStatus", AdCategoryController.changeCategoryStatus);

router.post("/addFaq", AdFaqController.addFaq);
router.get("/getAllFaq", AdFaqController.getAllFaq);
router.post("/getSpecificFaq", AdFaqController.getSpecificFaq);
router.post("/updateFaq", AdFaqController.updateFaq);
router.post("/deleteFaq", AdFaqController.deleteFaq);

router.get("/getAllCms", AdCmsController.getAllCms);
router.post("/getSpecificCms", AdCmsController.getSpecificCms);
router.post("/updateCms", AdCmsController.updateCms);

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);
router.get("/getAllUser", UserController.getAllUser);
router.post("/getUser", UserController.getUser);
router.get("/getAllCities", UserController.getAllCityNames);
router.get("/getAllProvinces", UserController.getAllProvinceNames);
router.post("/changePassword", UserController.changePassword);
router.post("/updateProfile", UserController.updateProfile);
router.post("/confirmEmail", UserController.confirmEmail);

module.exports = router;

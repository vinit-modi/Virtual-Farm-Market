const express = require("express");
const router = express.Router();

const UserController = require("../controller/Website/user");
const AdUserController = require("../controller/Admin/adUser");
const AdCategoryController = require("../controller/Admin/adCategory");
const AdFaqController = require("../controller/Admin/adFaq");
const AdCmsController = require("../controller/Admin/adCms");
const PaymentController = require("../controller/Website/payment");
const AddressController = require("../controller/Website/address");
const NotificationController = require("../controller/Website/notification");
const ProductController = require("../controller/Website/product");
const CartController = require("../controller/Website/cart");
const OrderController = require("../controller/Website/order");

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
router.post("/changePasswordForUser", UserController.changePassword);
router.post("/updateProfile", UserController.updateProfile);
router.post("/confirmEmail", UserController.confirmEmail);
router.post("/getCmsForUser", UserController.getCmsForUser);
router.get("/getAllFaqForUser", UserController.getAllFaqForUser);
router.get("/getUserImage", UserController.getUserImage);

router.post("/addNewCard", PaymentController.addNewCard);
router.get("/getAllSavedCards", PaymentController.getAllSavedCards);
router.post("/deleteCard", PaymentController.deleteCard);
router.post("/makeDefaultCard", PaymentController.makeDefaultCard);

router.post("/stripeAddCard", PaymentController.stripeAddCard);
router.get("/stripeGetAllCards", PaymentController.stripeGetAllCards);
router.post("/stripeSpecificCard", PaymentController.stripeSpecificCard);
router.post("/stripeMakeDefaultCard", PaymentController.stripeMakeDefaultCard);
router.post("/stripeDeleteCard", PaymentController.stripeDeleteCard);
router.post("/makePayment", PaymentController.makePayment);

router.post("/addNewAddress", AddressController.addNewAddress);
router.post("/editAddress", AddressController.editAddress);
router.post("/makeDefaultAddress", AddressController.makeDefaultAddress);
router.post("/deleteAddress", AddressController.deleteAddress);
router.get("/getAllAddress", AddressController.getAllAddress);
router.post("/getAddress", AddressController.getAddress);

router.get("/getAllNotification", NotificationController.getAllNotification);
router.post("/getNotification", NotificationController.getNotification);
router.post("/deleteNotification", NotificationController.deleteNotification);
router.get("/clearAllNotification", NotificationController.clearAll);
router.get("/notificationCount", NotificationController.notificationCount);

router.get("/getAllUnits", ProductController.getAllUnits);
router.post("/addProduct", ProductController.addProduct);
router.get("/categoriesForProduct", ProductController.categoriesForProduct);
router.get("/getAllProducts", ProductController.getAllProducts);
router.post("/getProduct", ProductController.getProduct);
router.post("/getPorductsByCategory", ProductController.getPorductsByCategory);

router.post("/addToCart", CartController.addToCart);
router.post("/removeProduct", CartController.removeProduct);
router.get("/getCartProducts", CartController.getCartProducts);
router.get("/cartItemsCount", CartController.cartItemsCount);
router.post("/decreaseQuantity", CartController.decreaseQuantity);

router.get("/getAllOrders", OrderController.getAllOrders);
router.get("/getAllOrdersForFarmer", OrderController.getAllOrdersForFarmer);
router.post("/getSpecificOrder", OrderController.getSpecificOrder);
router.post("/updateOrderStatus", OrderController.updateOrderStatus);

module.exports = router;

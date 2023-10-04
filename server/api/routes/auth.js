const express = require("express");
const router = express.Router();

const UserController = require("../controller/Website/user");

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);
router.get("/getAllUser", UserController.getAllUser);
router.post("/getUser", UserController.getUser);

module.exports = router;

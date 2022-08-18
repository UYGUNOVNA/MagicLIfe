const router = require("express").Router();
const authController = require("./../controller/authController");
const jwt = require("jsonwebtoken");
router.route("/sign_up").post(authController.sign_up);
router.route("/verify_code").post(authController.verifyCode);
router.route("/register_code").post(authController.registerData);

module.exports = router;

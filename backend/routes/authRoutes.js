const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", authController.registerCompany);
router.post("/verify-email/:companyId", authController.verifyEmail);
router.post("/phone-otp/", authController.sendPhoneOtp);
router.post("/verify-phone", authController.verifyPhoneOtp);
router.post("/login", authController.loginCompany);
router.get("/logout", authController.logoutCompany);

module.exports = router;

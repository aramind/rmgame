const express = require("express");
const authController = require("../controllers/auth/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/verify", authController.verify);

module.exports = router;

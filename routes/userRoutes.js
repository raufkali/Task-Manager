const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const validate = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

router.route("/register").post(controller.registerUser);
router.route("/login").post(controller.loginUser);
router.get("/current", validate, controller.currentUser);
router.get("/", validate, adminAuth, controller.getAllUsers);
module.exports = router;

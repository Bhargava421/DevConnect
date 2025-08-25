const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getUserProfile, updateUserProfile, updateUserPassword } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/update-password", protect, updateUserPassword);

module.exports = router;

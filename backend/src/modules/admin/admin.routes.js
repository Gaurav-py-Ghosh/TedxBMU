const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth.middleware");
const { loginAdmin, getStats, downloadRegistered, downloadAttended } = require("./admin.controller");

router.post("/login", loginAdmin);
router.get("/stats", verifyToken, getStats);
router.get("/download/registered", verifyToken, downloadRegistered);
router.get("/download/attended", verifyToken, downloadAttended);

module.exports = router;

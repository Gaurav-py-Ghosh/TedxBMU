const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth.middleware");
const { markAttendance } = require("./attendance.controller");

router.post("/mark", verifyToken, markAttendance);

module.exports = router;

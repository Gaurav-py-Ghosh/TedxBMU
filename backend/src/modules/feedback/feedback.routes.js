const express = require("express");
const router = express.Router();
const { submitFeedback } = require("./feedback.controller");

router.post("/", submitFeedback);

module.exports = router;

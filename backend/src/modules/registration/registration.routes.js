const express = require("express");
const router = express.Router();
const { registerUser, getQR } = require("./registration.controller");

router.post("/", registerUser);
router.get("/qr/:ticket_id", getQR);

module.exports = router;

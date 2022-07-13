const control = require("./controller.js");
const express = require("express");
const router = express.Router();

router.get("/login/process", control.process.getLogin);

module.exports = router;
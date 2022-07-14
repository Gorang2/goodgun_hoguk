const control = require("./controller.js");
const express = require("express");
const router = express.Router();

//need to set body-parser for middleware : ok
router.post("/login/process", control.process.getLogin);

module.exports = router;

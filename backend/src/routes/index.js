const control_login = require("./login/controller.js");
const control_board = require("./boards/controller");
const express = require("express");
const router = express.Router();

//need to set body-parser for middleware : ok
router.post("/login/process", control_login.process.getLogin);
router.get("/boards/posts/:category", control_board.process.getPost);

module.exports = router;

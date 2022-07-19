const control_login = require("./login/controller");
const control_board = require("./boards/controller");
const express = require("express");
const router = express.Router();

//need to set body-parser for middleware : ok

router.post("/login/process", control_login.process.handleLogin);
router.get("/boards/:category", control_board.process.getPosts);

module.exports = router;

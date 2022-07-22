const control_login = require("./login/controller");
const control_board = require("./boards/controller");
const express = require("express");
const router = express.Router();

//need to set body-parser for middleware : ok

router.post("/login/process", control_login.process.postLogin);
router.post("/register", control_login.process.postRegister);
router.get("/boards/:category", control_board.process.getPosts);
router.get("/posts/:category/:index", control_board.process.getComments);
router.post("/posts/:category/:index/like/:action", control_board.process.handleLikes);
router.post("/posts/:category/:index/comments/post", control_board.process.postComment)
router.post("/posts/:category/:index/comments/delete", control_board.process.deleteComment)

module.exports = router;

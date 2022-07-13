const express = require("express");
const login = require("./src/routes/login");
//=============MIDDLEWARES================
const app = express();
app.use("/", login);
module.exports = app ;

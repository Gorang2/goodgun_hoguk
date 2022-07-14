const express = require("express");
const bodyParser = require("body-parser");
const login = require("./src/routes/login");
//=============MIDDLEWARES================
const app = express();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({extended : false});

app.use(urlEncodedParser);
app.use("/", login);
module.exports = { app, urlEncodedParser, jsonParser} ;

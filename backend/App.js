const express = require("express");
const bodyParser = require("body-parser");
const login = require("./src/routes")
//==========SETTINGS============
const app = express();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({extended : true});

//==========MIDDLEWARES==========
// post empty body answer .... 
app.use(express.json());
app.use("/", login);
app.use(jsonParser);
app.use(urlEncodedParser);

module.exports = app ;

const db = require("../../data/DB");

const process = {
    postLogin :  (req, res) => {
        db.postLogin(req, res);
    },
    postRegister : (req, res) => {
        db.postRegister(req, res);
    }
}

module.exports = {process};
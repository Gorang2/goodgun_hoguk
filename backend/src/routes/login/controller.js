const db = require("../../data/DB");

const process = {
    handleLogin :  (req, res) => {
        db.postLogin(req, res);
    },
}

module.exports = {process};
const db = require("../../data/DB");

const process = {
    getLogin :  (req, res) => {
        db.handleLogin(req, res);
    },
}

module.exports = {process};
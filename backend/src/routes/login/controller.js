const db = require("../../data/DB");
const process = {
    getLogin :  (req, res) => {
        db.getFromDB(req, res);
    },
}


module.exports = {process};
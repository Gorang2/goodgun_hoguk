const mysql = require("mysql2");
const dbData = require("./DBdata.js");

console.log("in db");
const pool = mysql.createPool(dbData);

module.exports = {
    getFromDB : (req, res) => {
        pool.getConnection((err, con) => {
		if (err) throw (err);
        var sql = "SELECT * FROM USERS";
        con.query(sql, (err, result) => {
            if (err) throw (err);
            con.release();
            res.send(result);
        })
        })
    },
    pool : pool
}



const mysql = require("mysql2");
const dbData = require("./DBdata.js");


const pool = mysql.createPool(dbData);

module.exports = {
    getFromDB : (req, res) => {
        pool.getConnection((err, con) => {
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



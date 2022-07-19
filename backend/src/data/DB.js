const mysql = require("mysql2");
const dbData = require("./DBdata.js");

console.log("in db");
const pool = mysql.createPool(dbData);

module.exports = { 
    postLogin : (req, res) => {
        pool.getConnection((err, con) => {
        if (err) throw (err);
        console.log(req.body);
        var sql = "SELECT * FROM USERS";
        con.query(sql, (err, result) => {
        if (err) throw (err);
        con.release();
        for (var i=0; i<result.length; i++)
        {
               var info = JSON.parse(JSON.stringify(result))[i];
               if (info.id == req.body.id && info.pw == req.body.pw) {
                   res.json({'statusCode' : 200});
                   return ;
               }
        };
        res.json({'statusCode' : 404});
        });
    })},
    getPosts : (req, res) => {
        var category = req.params.category;
        console.log(category);
        pool.getConnection((err, con) => {
            if (err) throw (err);
            var sql = `SELECT * FROM POSTS WHERE CATEGORY='${category}'`;
            con.query(sql, (err, result) => {
                if (err) throw(err);
                con.release();
                res.json(result);
            })
        })
    },
    pool : pool
} 



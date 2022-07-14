const mysql = require("mysql2");
const dbData = require("./DBdata.js");


const pool = mysql.createPool(dbData);

module.exports = {
    handleLogin : (req, res) => {
        pool.getConnection((err, con) => {
        if (err) throw (err);
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
            }
            res.json({'statusCode' : 404, 'statusmsg' : '아이디가 존재하지 않거나 비밀번호가 틀립니다.'});

        });
        })
    },
    pool : pool
}



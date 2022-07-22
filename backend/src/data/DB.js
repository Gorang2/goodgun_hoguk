const mysql = require("mysql2");
const dbData = require("./DBdata.js");

console.log("in db");
const pool = mysql.createPool(dbData);

module.exports = { 
    postRegister : (req, res) => { 
        pool.getConnection((err, con) => {
            if (err) throw (err);
            console.log('register post : ', req.body.id);
            var sql = `SELECT * FROM USERS WHERE ID='${req.body.id}'`;
            con.query(sql, (err, result) => {
                if (err) throw (err);
                console.log(result.length);
                if (result.length != 0) {
                    res.json({'statusCode' : 404, 'errMsg' : '이미 존재하는 아이디입니다. 다른 아이디로 다시 시도하세요.'});
                    con.release();
                    return ;
                } else {
                    console.log("registered");
                    con.query(`INSERT INTO USERS (id, pw) VALUE ('${req.body.id}', '${req.body.pw}')`, (err, result) => {
                        con.release();
                        if (err) {
                            console.log(err);
                            res.json({'statusCode' : 404, 'errMsg' : '예기치 못한 오류가 발생했습니다.'});
                            return ;
                        } else {
                            console.log("ok");
                            res.json({'statusCode' : 200});
                            return ;
                        }
                    })
                }
            })
        })
    },
    postLogin : (req, res) => {
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
        };
        res.json({'statusCode' : 404});
        });
    })},
    getPosts : (req, res) => {
        var category = req.params.category;
        pool.getConnection((err, con) => {
            if (err) throw (err);
            var sql = `SELECT * FROM POSTS_${category} ORDER BY date,time DESC;`;
            con.query(sql, (err, result) => {
                if (err) throw(err);
                con.release();
                res.json(result);
            })
        })
    },
    getComments : (req, res) => {
        var index = req.params.index;
        var category = req.params.category;
        var sql = `SELECT * FROM comments_${category} WHERE Postnum='${index}'`;
        pool.getConnection((err, con) => {
            if (err) throw (err);
            con.query(sql, (err, result) => {
                if (err) throw (err);
                con.release();
                res.json(result);
            })
        })
    },
    postLikes : (req, res) => {
        var index = req.params.index;
        var category = req.params.category;
        var action = req.params.action;
        var sql = `UPDATE POSTS_${category} SET likes=${action==='upVote' ? 'likes+1' : 'likes-1'} WHERE \`index\`=${index}`;
        console.log(sql);
        console.log(req.params);
        pool.getConnection((err, con) => {
            if (err) throw (err);
            con.query(sql, (err, result) => {
                if (err) throw (err);
                con.release;
                console.log("LIKED");
            })
        })
    },
    postComment : (req, res) => {
        var category = req.params.category;
        var index = req.params.index;
        var id = req.body.id;
        var comment = req.body.comment;
        var dateObj = new Date();
        var date = dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDay();
        var time = dateObj.getHours() + ':' + dateObj.getMinutes();
        console.log(date, time);
        pool.getConnection((err, con) => {
            if (err) throw (err);
            var sql = `INSERT INTO comments_${category}(postNum, id, comment) VALUES (${index}, '${id}', '${comment}'); UPDATE posts_${category} SET comment_count=comment_count+1 WHERE \`index\`=${index};`;
            con.query(sql, (err, result) => {
                if (err) throw (err);
                console.log('Comment Updated');
            });
        })
    },
    deleteComment : (req, res) => {
        var category = req.params.category;
        var index = req.params.index;
        var seq = req.body.seq;
        var sql = `DELETE FROM comments_${category} WHERE seq=${seq};UPDATE posts_${category} SET comment_count=comment_count-1 WHERE \`index\`=${index}`;
        pool.getConnection((err, con) => {
            if (err) throw (err);
            con.query(sql, (err, result) => {
                if (err) throw (err);
                console.log('comment deleted');
                res.json({'statusCode' : 200});
            })
        })
    },
    pool : pool
} 



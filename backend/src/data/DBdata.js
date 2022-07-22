require("dotenv").config();

const dbData = {
    user : process.env.DB_USER,
    password : process.env.PASSWORD,
    host : process.env.HOST,
    port : process.env.DB_PORT,
    database : process.env.DB,
    multipleStatements: true //다중 쿼리 (; 기준)
}

module.exports = dbData;

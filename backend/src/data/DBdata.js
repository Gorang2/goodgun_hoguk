require("dotenv").config();

const dbData = {
    user : process.env.DB_USER,
    password : process.env.PASSWORD,
    host : process.env.HOST,
    port : process.env.DB_PORT,
    database : process.env.DB,
}

module.exports = dbData;

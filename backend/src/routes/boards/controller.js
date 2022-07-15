const db = require("../../data/DB");

const process = {
    getPosts : (req, res) => {
        db.getPosts(req, res);
    }
};

module.exports = process;
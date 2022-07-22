const db = require("../../data/DB");

const process = {
    getPosts : (req, res) => {
        db.getPosts(req, res);
    },
    getComments : (req, res) => {
        db.getComments(req, res);
    },
    handleLikes : (req, res) => {
        db.postLikes(req, res);
    },
    postComment : (req, res) => {
        db.postComment(req, res);
    },
    deleteComment : (req, res) => {
        db.deleteComment(req,res);
    }
};

module.exports = { process };
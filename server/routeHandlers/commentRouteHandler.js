const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const commentSchema = require("../schemas/commentSchema");
const Comment = new mongoose.model("Comment", commentSchema); //singular name model

router.post("/", (req, res) => {
  const newComment = new Comment(req.body);
  newComment.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

module.exports = router;

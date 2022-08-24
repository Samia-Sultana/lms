const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const videoSchema = require("../schemas/videoSchema");
const Video = new mongoose.model("Video", videoSchema); //singular name model

router.post("/", (req, res) => {
  const newVideo = new Video(req.body);
  newVideo.save((err) => {
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

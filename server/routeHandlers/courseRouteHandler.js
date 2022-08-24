const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const courseSchema = require("../schemas/courseSchema");
const Course = new mongoose.model("Course", courseSchema); //singular name model

router.post("/", (req, res) => {
  const newCourse = new Course(req.body);
  newCourse.save((err) => {
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

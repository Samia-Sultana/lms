const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  title:{
    type: String,
    required: true,
    },
  link: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher"
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course"
  }
});

module.exports = videoSchema;
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  description: {
    type: String,
  },
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student"
  },
  video: {
    type: mongoose.Types.ObjectId,
    ref: "Video"
  }
});

module.exports = commentSchema;
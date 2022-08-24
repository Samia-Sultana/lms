const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  photo:{
    data: Buffer,
    contentType: String
  },
  admin:{
    type: mongoose.Types.ObjectId,
    ref: "Admin"
  },
  teachers:[
    {
    type: mongoose.Types.ObjectId,
    ref: "Teacher"
    }
   ],
  videos:[
    {
    type: mongoose.Types.ObjectId,
    ref: "Video"
    }
   ],
   students:[
    {
      type: mongoose.Types.ObjectId,
      ref: "Student"
      }
   ],
   comments:[
    {
    type: mongoose.Types.ObjectId,
    ref: "Comment"
    }
   ]

});

module.exports = courseSchema;
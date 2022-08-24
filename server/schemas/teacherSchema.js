const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
},
  password: {
    type: String,
    required: true,
},
  photo:{
  data: Buffer,
  contentType: String
},
 admin:{
  type: mongoose.Types.ObjectId,
  ref: "Admin"
},
 courses:[
  {
  type: mongoose.Types.ObjectId,
  ref: "Course"
  }
 ]
});

module.exports = teacherSchema;
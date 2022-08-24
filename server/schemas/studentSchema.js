const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
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
courses:[
  {
    type: mongoose.Types.ObjectId,
    ref: "Course"
  }
],

});

module.exports = studentSchema;
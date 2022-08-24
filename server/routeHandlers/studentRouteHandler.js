const express = require('express');
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
const multer = require('multer');
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const studentSchema = require("../schemas/studentSchema");
const Student = new mongoose.model("Student", studentSchema); //singular name model
const courseSchema = require("../schemas/courseSchema");
const Course = new mongoose.model("Course", courseSchema);


//student image file handling

const UPLOADS_FOLDER = "./routeHandlers/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const upload = multer({
	storage: storage,
  limits: {
    fileSize: 5000000, // 5MB
  },
  
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "userPhoto") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) { cb(null, true);  } 
      else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    }
  }
});


// SIGNUP
router.post("/signup", /*validation midddleware of student data goes here */upload.single("userPhoto"),  async(req, res) => {
 
  try {
      const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
      const newStudent = new Student({
          name: req.body.userName,
          phone: req.body.userPhone,
          email: req.body.userEmail,
          password: hashedPassword,
          photo: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
          }
      });

      const user = await newStudent.save();
        // generate token
        const token = jwt.sign({
          username: user.email,
          userId: user._id,
        }, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });

        res.status(200).json({
          "access_token": token,
          "message": "Login successful!"
      });  
      
  }
  catch {
    res.status(401).json({
      "error": "login  failed!"
  });
  }
});

//student login
router.post("/", async (req, res) => {
  try{
    const user = await Student.find({email:req.body.userEmail});
    if(user && user.length > 0) {
      console.log(user);
    const isValidPassword = await bcrypt.compare(req.body.userPassword, user.password);
    console.log(isValidPassword);
          if(isValidPassword){
              // generate token
              const token = jwt.sign({
                username: user.email,
                userId: user._id,
              }, process.env.JWT_SECRET, {
                expiresIn: '1h'
              });
              res.status(200).json({
                "access_token": token,
                "message": "Login successful!"
            });
        }
        else {
            res.status(401).json({
                "error": "Authetication failed 1!"
            });
        }
      }
      else{
        res.status(401).json({
          "error": "Authetication failed 2!"
      });
      }
    }
  catch{
    res.status(401).json({
      "error": "Authetication failed 3!"
  });
  }
 
});

router.post("/enroll/course", upload.single("photo"), async(req,res)=>{
  console.log(req.body);
  //ad course to student table
  await Course.updateOne({_id: ObjectId(req.body.course)},{
    $push:{
      students: ObjectId(req.body.student)
    }
  });
  //add student to course table
  await Student.updateOne({_id: ObjectId(req.body.student)},{
    $push:{
      courses: ObjectId(req.body.course)
    }
  });
  //add purshase info in purchase table
});
router.post("/update/profile", async(req,res)=>{

});

module.exports = router;

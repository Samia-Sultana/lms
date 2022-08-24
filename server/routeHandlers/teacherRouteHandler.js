const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ObjectId } = require('mongodb');
var fs = require('fs');
var path = require('path');
const multer = require('multer');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const teacherSchema = require("../schemas/teacherSchema");
const Teacher = new mongoose.model("Teacher", teacherSchema); //singular name model
const videoSchema = require("../schemas/videoSchema");
const Video = new mongoose.model("Video", videoSchema);
const courseSchema = require("../schemas/courseSchema");
const Course = new mongoose.model("Course", courseSchema);


/**************video handling using multer ********************** */

const UPLOADS_FOLDER = "./routeHandlers/uploads/videos";
// define the diskStorage->diskStorage has access over disk. to manipulate disk files
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

//file upload with multer-multer() returns a middleware to upload
const upload = multer({
	storage: storage,
  limits: {
    fileSize: 50000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "link") {
      if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv") 
        { cb(null, true);  } 
      else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    }
  }
});

//teacher login
router.post("/", async (req, res) => {
  try{
    const user = await Teacher.find({email:req.body.userEmail});
    if(user && user.length > 0) {
    const isValidPassword = await bcrypt.compare(req.body.userPassword, user.password);
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
        } else {
            res.status(401).json({
                "error": "Authetication failed!"
            });
        }
      }
      else{
        res.status(401).json({
          "error": "Authetication failed!"
      });
      }
    }
  catch{
    res.status(401).json({
      "error": "Authetication failed!"
  });
  }
 
});



router.post("/upload/video", upload.single("link"),async(req,res)=>{
  let newVideo = {
    title: req.body.title,
    link:  fs.readFileSync(path.join(__dirname + '/uploads/videos/' + req.file.filename)),
    publishDate: req.body.date,
    teacher: ObjectId(req.body.teacher),
    course: ObjectId(req.body.course)
      
  };
  Video.create(newVideo, async(err, item) => {
    if (err) {
        console.log(err);
    }
    else {
      //updating course table
      
      await Course.updateOne({_id: ObjectId(req.body.course)},{
        $push:{
          videos: item._id
        }
      });
      res.send("successfully inserted into database");
    }
    

});
});

module.exports = router;

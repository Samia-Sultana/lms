/*this is the entry file of the server*/

// import modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const adminRouteHandler = require("./routeHandlers/adminRouteHandler");
const courseRouteHandler = require("./routeHandlers/courseRouteHandler");
const studentRouteHandler = require("./routeHandlers/studentRouteHandler");
const teacherRouteHandler = require("./routeHandlers/teacherRouteHandler");
const videoRouteHandler = require("./routeHandlers/videoRouteHandler");
const commentRouteHandler = require("./routeHandlers/commentRouteHandler");

dotenv.config();

// app
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());




//database connection
mongoose.connect("mongodb://localhost:27017/LMS", { useNewUrlParser: true, useUnifiedTopology: true,})
		.then(() => console.log("DB CONNECTED"))
		.catch((err) => console.log(err));




/// middleware





// routes
app.get("/", (req,res)=>{
	res.send("hello world");
});
app.use("/admin", adminRouteHandler);
app.use("/course", courseRouteHandler);
app.use("/teacher", teacherRouteHandler);
app.use("/student", studentRouteHandler);
app.use("/comment", commentRouteHandler);
app.use("/video", videoRouteHandler);


// default error handler
function errorHandler(err, req, res, next) {
	if (res.headersSent) {
	  return next(err);
	}
	res.status(500).json({ error: err });
  }


// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);
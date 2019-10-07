var express = require("express");
var ejs = require("ejs");
var path = require("path");
var mongoose = require("mongoose");

var routes = require("./controllers/routes");
var posts = require("./controllers/postHandler");

var app = express();
app.set("view engine", "ejs");
app.disable("x-powered-by");
app.use(express.static(path.join(__dirname , "public")));

//starting database
var url = "mongodb://localhost/betaTest"
    mongoose.connect(url);
    mongoose.connection.once("open", function(){
        console.log("connection Established");
    }).on("error",function(err){
        console.log("error in connecction" + "\n" + err);
    });


//fire routes 
posts(app);
routes(app);

//fire posts




app.listen(process.env.PORT || 3000, function(){
    console.log("App started at localhost:" + app.get("port") + "Enter Ctrl + C to exit"); 
});
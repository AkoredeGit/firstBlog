var multer = require("multer");
var lower = require("lower-case");
var cors = require("cors");
var body = require("body-parser");
var objectId = require("mongodb").ObjectID;

var models = require("./model/blog");
var postModel = models.postData;
var contactModel = models.contactDB;
var aboutModel = models.aboutDB;

var urlEncodedParser = body.urlencoded({extended: false});


module.exports = function(app){
    var midddleware = {
        storage: multer.diskStorage({
            destination: function(req, file, next){
                next(null, "./public/images");
            },
            filename: function(req, file, next){
                var ext = file.mimetype.split("/")[1];
                next(null, file.fieldname + "-" + Date.now() + "." + ext);
            }
        }),

        fileFilter: function(req, file, next){
            if(!file){
                next();
            }
            const image = file.mimetype.startsWith('image/');
            if (image){
                next(null, true);
            }else{
                next({message: "File format not supported"}, false);
            }
        }
    }

    app.post("/", cors() ,multer(midddleware).single("image"), function(req, res){
        if (req.file){
            console.log(req.file);
            req.body.image = req.file.filename
        }
        var category = req.body.category;
        var author = req.body.author;
        var headline = req.body.headline;
        var articleHead = req.body.articleHead;
        var content = req.body.content;

        var newData = new postModel({
            'category': category,
            'author': author,
            'Headline': headline,
            'postHead': articleHead,
            'Content': content,
            'views': 0,
            'Image': req.body.image,
            'postDate': Date.now()
        }).save(function(err, result){
            if (err) throw err
            if (result){
                res.redirect("/admin");
            }
        })
    });


    app.delete("/:query", cors(), function(req, res){
        var id = req.params.query;


        postModel.deleteOne({"_id": objectId(id)}, function(err, result){
            if (err){
                res.render("500");
            }
            else if(result){
                console.log("sucessfully deleted");
                res.render("admPost", {data: result});
            }
            else{
                res.send("No item to Delete")
            }
        })
    })

    app.post("/:query", cors(), multer(midddleware).single("image"), function(req, res){
        var query = req.params.query;


        var category = req.body.category;
        var author = req.body.author;
        var headline = req.body.headline;
        var articleHead = req.body.articleHead;
        var content = req.body.content;

        var update ={
            'category': category,
            'author': author,
            'Headline': headline,
            'postHead': articleHead,
            'Content': content,
            'postDate': Date.now()
        }

        postModel.findOneAndUpdate({"_id": objectId(query)}, 
        update, {new: true}, function(err, doc){
            if (err){
                res.send(err);
            }else{
                res.redirect("/admin/" + query);
            }

        })
    })

    app.post("/image/:query", cors(), multer(midddleware).single("image"), function(req, res){
        var query = req.params.query;

        if (req.file){
            console.log(req.file);
            req.body.image = req.file.filename;
        }

        var update = {
            'Image': req.body.image
        }
        postModel.findOneAndUpdate({"_id": objectId(query)},
        update, {new: true}, function(err, doc){
            if(err){
                res.render("500");
            }else{
                res.render("updateImg", {data: doc});
            }
        })
    
    })

    app.post("/post/:query", urlEncodedParser ,function(req, res){
        var query = req.params.query;

        var comment = req.body.Comment;
        var name = req.body.Name;

        var update = {
            $push:{
                postComment: {
                    $each: [{
                        'name': name,
                        'comment': comment,
                        'date': Date.now()
                    }]
                }
            }
        }

        postModel.findOneAndUpdate({'Headline': query}, update, 
        {new: true}, function (err, doc){
            if (err) throw err;
            if (doc){
                res.render("post", {post: doc});
            }
        })
    })

}
const cors = require("cors");
var objectId = require("mongodb").ObjectID;

var models = require("./model/blog");
module.exports = function(app){

    // Calling my Schema into my routes
    postModel = models.postData;
    aboutModel = models.aboutDB;
    contactModel = models.contactDB;

    app.get("/", function(req, res){
        postModel.paginate({}, {page: 1, limit: 12, sort: {"postDate": -1}}, function(err, result){
            if(err){
                console.log("An error ocurred", err);
            }else if (result){
                res.render("home", {data: result});
            }else{
                res.send("No item in the database");
            }
        })
    });

    app.get("/page=:query", function(req, res){
        var query = req.params.query;
        
        postModel.paginate({}, {page: query, limit: 12, sort: {"postDate": -1}}, function(err, result){
            if (err) throw err;
            if (result){
                res.render("home", {data: result});
            }else{
                res.render("404");
            }
        })
    })

    app.get("/about", function(req, res){
        res.render("about", {title: "About Page"});
    });
    app.get("/contact", function(req, res){
        res.render("contactG", {title: "Contact Page"});
    });
    app.get("/post/:query", function(req, res){
        var query = req.params.query;

        postModel.findOne({
            '_id': objectId(query)
        }, function (err, doc) {
            var i = 1;
            let view = doc.views + i;
            let update = {
                'views': view
            }
            if(err){
                res.render("500");
            }
            else{
                postModel.findOneAndUpdate({"_id": objectId(query)}, 
                update, {new: true}, function(err, doc){
                    if (err){
                        res.send(err);
                    }else{
                        res.render("post", {post:doc});
                    }
                })
            }
        })
    });
    
    app.get("/admin", function(req, res){
        
        res.render("admin");
    
    });
    app.get("/admin/posts", function(req, res){
        
        postModel.find({}, function(err, result){
            if (err){
                res.render("500");
            }
            else if (result){
                res.render("admPost", {data: result});
            }
            else{
                res.send("Database Error");
            }
        });
    });

    app.get("/admin/:query", function(req, res){
        let query = req.params.query;

        postModel.findOne({
            "_id": objectId(query)
        }, function(err, doc){
            if(err){
                res.render("400");
            }
            else{
                res.render("adUpdate", {data: doc});
            }
        })
    })

    app.get("/admin/image/:query", function(req, res){
        let query = req.params.query;

        postModel.findOne({
            "_id": objectId(query)
        }, function(err, doc){
            if(err){
                res.render("500");
            }
            else{
                res.render("updateImg", {data: doc});
            }
        })
    })
    
    app.get("/admin/about", function(req, res){
        res.render("aboutAdmin");
    })
    app.get("/category/:query", function(req, res){
        query = req.params.query

        postModel.paginate({'category': query}, {page: 1, limit: 12, sort: {"postDate": -1}}, 
        function (err, result){
            if (err) throw err;
            if (result.docs.length){
                res.render("category", {data: result});
            }
            else{
                res.render("404");
            }
        })
    })

    app.get("/category/Travel/page=:query", function(req, res){
        query = req.params.query;

        postModel.paginate({'category': "Travel"}, {page: query, limit: 12, sort: {"postDate": -1}}, 
        function (err, result){
            if (err) throw err;
            if (result.docs.length){
                res.render("category", {data: result});
            }
            else{
                res.render("404");
            }
        })

    })

    app.get("/category/Lifestyle/page=:query", function(req, res){
        query = req.params.query;

        postModel.paginate({'category': "Lifestyle"}, {page: query, limit: 12, sort: {"postDate": -1}}, 
        function (err, result){
            if (err) throw err;
            if (result.docs.length){
                res.render("category", {data: result});
            }
            else{
                res.render("404");
            }
        })

    })

    app.get("/category/Music/page=:query", function(req, res){
        query = req.params.query;

        postModel.paginate({'category': "Music"}, {page: query, limit: 12, sort: {"postDate": -1}}, 
        function (err, result){
            if (err) throw err;
            if (result.docs.length){
                res.render("category", {data: result});
            }
            else{
                res.render("404");
            }
        })

    })
    
    app.get("/category/Design/page=:query", function(req, res){
        query = req.params.query;

        postModel.paginate({'category': "Design"}, {page: query, limit: 12, sort: {"postDate": -1}}, 
        function (err, result){
            if (err) throw err;
            if (result.docs.length){
                res.render("category", {data: result});
            }
            else{
                res.render("404");
            }
        })

    })
    //404 error handler
    app.use(function(req, res){
        res.status(404).render("404");
    
    });
    //500 error handler
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500).render("500");
    });
}
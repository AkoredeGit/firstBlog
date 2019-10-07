var mongoose = require("mongoose");
var paginate = require("mongoose-paginate");

var post = [{
    category: String,
    author: String,
    Headline: String,
    postHead: String,
    Content: String,
    Image: String,
    views: Number,
    postDate: Date,
    postComment: [{
        name: String,
        comment: String,
        date : Date
    }]
}]

var about = {
    shortAbout: String,
    story: String,
    mission:String,
    vision: String,
    who: String,
    coreValue: String
}

var contact = {
    shortStory: String,
    address: String,
    email1: String,
    email2: String,
    tel: String
}

var schema = mongoose.Schema;

var aboutSchema = new schema(about);
aboutSchema.plugin(paginate);

var contactSchema = new schema(contact);
contactSchema.plugin(paginate);

var postSchema = new schema(post);
postSchema.plugin(paginate);

var postModel = mongoose.model("Model", postSchema);
var contactModel = mongoose.model("Model2", contactSchema);
var aboutModel = mongoose.model("Model3", aboutSchema);

exports.postData = postModel;
exports.aboutDB = aboutModel;
exports.contactDB = contactModel;


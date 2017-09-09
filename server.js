var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars');
// var mongojs = require("mongojs");
var request = require("request");
var cheerio  = require("cheerio");
var Article = require("./models/article.js");
var Comment = require("./models/comment.js");
var logger = require("morgan");
// var routes = require("./routes/routes");
// var mongodb = require("mongodb");
mongoose.Promise = Promise;
var app = express();
// var databaseUrl = "newsDB";
// var collections = ["articles"];
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect("mongodb://localhost/newsDB");
var db = mongoose.connection;
// var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Mongoose Error:", error);
});
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

db.once("open", function() {
  console.log("Mongoose connection succesful.");
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res) {
    // Make a request for the news section of sfchronicle
    request("http://www.sfchronicle.com/", function(error, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        var result = {};
        // For each element with a "title" class
        $("h2.headline").each(function(i, element) {
            // Save the text and href of each link enclosed in the current element
            result.title = $(this).find('a').text();
            result.link = $(this).find("a").attr("href");
            var entry = new Article(result);
            entry.save(function(err, doc) {
              if (err) {
                console.log(err);
              }
              else {
                console.log(doc);
              }
            });
            // console.log(title, link);
            // results.push({
            //   link: link,
            //   title: title
            // });
            // db.articles.insert({
            //   title: title,
            //   link: link
            // });

        });
        // res.send(results);
        res.send("Scrape Complete");
    });
});

// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
  Article.find({}, function(error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      res.json(doc);
    }
  });
});

// Grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {
  Article.findOne({"_id": req.params.id})
  .populate("comment")
  .exec(function(error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      res.json(doc);
    }
  });
});

// Create a new note or replace an existing note
app.post("/articles/:id", function(req, res) {
  var newComment = new Comment(req.body);
  // And save the new note the db
  newComment.save(function(error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({"_id": req.params.id}, {"comment": doc._id})
      .exec(function(err, doc) {
        if (err) {
          res.send(err);
        }
        else {
          res.send(doc);
        }
      });
    }
  });
});

app.post("/deleteComment/:id", function(req, res) {
  console.log(req.params.id);
  Comment.findIdAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      console.log("error deleting comment", err);
    }
    else {
      res.send();
    }
  });
});

app.post("/deleteArticle/:id", function(req, res) {
  console.log(req.params.id);
  Article.findIdAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      console.log("error deleting article", err);
    }
    else {
      res.send();
    }
  });
});



// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
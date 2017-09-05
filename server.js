var express = require("express");
// var bodyParser = require("body-parser");
// var models = require("/models");
var exphbs  = require('express-handlebars');
var mongojs = require("mongojs");
var request = require("request");
var cheerio  = require("cheerio");
// var mongodb = require("mongodb");
var app = express();
var databaseUrl = "news";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


app.get("/", function(req, res) {
  res.render("index");
});

// app.get("/all", function(req, res) {
//   db.articles.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(found);
//     }
//   });
// });

// app.get("/scrape", function(req, res) {
//   // Make a request for the news section of ycombinator
//   request("https://sfchronicle.com/", function(error, response, html) {
//     // Load the html body from request into cheerio
//     var $ = cheerio.load(html);
//     var results = [];
//     // For each element with a "title" class
//     $("h2.headline").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children().text();
//       var link = $(element).children("a").attr("href");
//      results.push({
//       title: title,
//       link: link
//      });
//    });

// console.log(results);
// });
// });

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
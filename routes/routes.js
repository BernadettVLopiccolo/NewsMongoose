// var express = require('express');
// var router = express.Router();
// var Article = require('../models/article');
// var Note = require('../models/comment');
// var scraper = require('../controller/scrape');

// router.get("/", function(req, res) {
//   // res.render("index");
//   Article.find({}, function(err, data) {
//   	 if (error) {
//       res.send(error);
//     }
//     else {
//       res.render("index", {title: "NewsMongoose", articles: data});
//     }
//   });
// });

// router.get("/scrape", function(req, res) {
//     // Make a request for the news section of sfchronicle
//     request("http://www.sfchronicle.com/", function(error, response, html) {
//         // Load the html body from request into cheerio
//         var $ = cheerio.load(html);
//         var results = [];
//         // For each element with a "title" class
//         $("h2.headline").each(function(i, element) {
//             // Save the text and href of each link enclosed in the current element
//             var title = $(element).find('a').text();
//             var link = $(element).find("a").attr("href");
//             console.log(title, link);
//             results.push({
//               link: link,
//               title: title
//             });
//             db.articles.insert({
//               title: title,
//               link: link
//             });

//         });
//         // res.send(results);
//         res.json(results);
//     });
// });

// // This will get the articles we scraped from the mongoDB
// router.get("/articles", function(req, res) {
//   Article.find({}, function(error, doc) {
//     if (error) {
//       res.send(error);
//     }
//     else {
//       res.json(doc);
//     }
//   });
// });

// // Grab an article by it's ObjectId
// router.get("/articles/:id", function(req, res) {
//   Article.findOne({"_id": req.params.id})
//   .populate("comment")
//   .exec(function(error, doc) {
//     if (error) {
//       res.send(error);
//     }
//     else {
//       res.json(doc);
//     }
//   });
// });

// // Create a new note or replace an existing note
// router.post("/articles/:id", function(req, res) {
//   var newComment = new Comment(req.body);
//   // And save the new note the db
//   newComment.save(function(error, doc) {
//     if (error) {
//       res.send(error);
//     }
//     else {
//       // Use the article id to find and update it's note
//       Article.findONeAndUpdate({"_id": req.params.id}, {"comment": doc._id})
//       .exec(function(err, doc) {
//         if (err) {
//           res.send(err);
//         }
//         else {
//           res.json(doc);
//         }
//       });
//     }
//   });
// });
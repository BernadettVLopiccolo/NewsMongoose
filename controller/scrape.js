// var cheerio = require("cheerio");
// var request = require("request");


// function scrapeNews(cb) {
// // app.get("/scrape", function(req, res) {
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
//             var scrapeArticle = new Article({
//                 title: title,
//                 link: link
//             });
//             scrapeArticle.save(function(error) {
//                 console.log(error);
//             });
//             // results.push({
//             //   link: link,
//             //   title: title
//             // });
//             // db.articles.insert({
//             //   title: title,
//             //   link: link
//             // });

//         });
//         // res.send(results);
//         res.json(results);
//     });
//     }
// // });

// exports.scrapeNews = scrapeNews;
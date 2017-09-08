var cheerio = require("cheerio");
var request = require("request");


app.get("/scrape", function(req, res) {
    // Make a request for the news section of sfchronicle
    request("https://sfchronicle.com/", function(error, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        var results = [];
        // For each element with a "title" class
        $("h2.headline").each(function(i, element) {
            // Save the text and href of each link enclosed in the current element
            var title = $(element).children().text();
            var link = $(element).children("a").attr("href");
            console.log(title, link);
            //  if (title && link) {
            //  db.articles.insert({
            //  title: title,
            //  link: link
            // },
            // function(err, inserted) {
            // 	if(err) {
            // 		console.log("Unable to insert!", err);
            // 	}
            // 	else {
            // 		console.log("Inserted!", inserted)
            // 	}
            // });
        });
    });
    res.send("Scrape Complete");
});
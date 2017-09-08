$(document).ready(function() {

function displayResults(news) {
	$("tbody").empty();
	news.forEach(function(news) {
		$("tbody").append("<tr><td>" + news.title + "</td>" +
			                   "<td>" + news.link + "</td></tr>");
	});
}

$(".savedArt").on('click', function() {
	$(".latestArticles").css("visibility", "hidden");
});
// $getJSON("/all", function(data) {
// 	displayResults(data);
// });
})
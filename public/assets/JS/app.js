$(document).ready(function() {
	$.getJSON("/articles", function(data) {
		for (var i = 0; i < data.length; i++) {
			$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
		}
	});

	$(document).on("click", "p", function() {
		$("#comments").empty();
		var thisId = $(this).attr("data-id");
		$.ajax({
			method: "GET",
			url: "/articles/" + thisId
		})
		.done(function(data) {
			console.log(data);
			$("#comments").append("<h2>" + data.title + "</h2>");
			// $("#comments").append("<input id='titleInput' name='title' >");
			$("#comments").append("<textarea id='bodyInput' name='body'></textarea>");
			$("#comments").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");

			if (data.comment) {
				// $("#titleinput").val(data.comment.title);
				$("#bodyInput").val(data.comment.body);
			}

		});
	});

	$(document).on("click", "saveComment", function() {
		var thisId = $(this).attr("data-id");
		$.ajax({
			method: "POST",
			url: "/articles/" + thisId,
			data: {
				// title: $("#titleinput").val(),
				body: $("bodyInput").val()
			}
		})
		.done(function(data) {
			console.log("data", data);
            $("comments").empty();
		});
		// $("#titleInput").val("");
		$("#bodyInput").val("");
	});
});
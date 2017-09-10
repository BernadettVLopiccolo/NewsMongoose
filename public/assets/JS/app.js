$(document).ready(function() {
    $.getJSON("/articles", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br /><a href='" + data[i].link + "'>" + data[i].link + "</a></p><button type='submit' id='save' class='btn btn-default'>Save Article</button>");
            // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    });

    $(document).on("click", "#save", function() {
        var thisId = $(this).attr("data-id");
        $.ajax({
                method: "GET",
                url: "/saved/" + thisId
            })
            .done(function(data) {
                console.log(data);
                $.getJSON("/saved", function(data) {
                    for (var j = 0; j < data.length; i++) {
                        $("#savedArticles").append("<p data-id='" + data[j]._id + "'>" + data[j].title + "<br /><a href='" + data[j].link + "'>" + data[j].link + "</a></p><button type='submit' id='comment' class='btn btn-default'>Comment</button><button>Delete Article</button>");
                    }
                });
            });
    });

    $(document).on("click", "p", function() {
        $("#comments").empty();
        var thisId = $(this).attr("data-id");
        $.ajax({
                method: "GET",
                url: "/saved/" + thisId
            })
            .done(function(data) {
                console.log(data);
                $("#comments").append("<h2>" + data.title + "</h2>");
                $("#comments").append("<textarea id='bodyInput' name='body'></textarea>");
                $("#comments").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");

                if (data.comment) {
                    $("#bodyInput").val(data.comment.body);
                }

            });
    });

    $(document).on("click", "#saveComment", function() {
        var thisId = $(this).attr("data-id");
        $.ajax({
                method: "POST",
                url: "/saved/" + thisId,
                data: {
                    body: $("bodyInput").val()
                }
            })
            .done(function(data) {
                console.log("data", data);
                $("comments").empty();
            });
        $("#bodyInput").val("");
    });


});
var mongoose = require("mongoose");

// var db = require("../config/connection");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var CommentSchema = new Schema({
  // Just a string
  commentText: {
    type: String
  },
  // Just a string
  body: {
    type: String
  }
});
// Create the Note model with the NoteSchema
var Comment = mongoose.model("comment", CommentSchema);
// Export the Note model
module.exports = Comment;
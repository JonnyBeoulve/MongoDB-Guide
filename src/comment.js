const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*==============================================================
// The schema that defines the structure of a comment within
// a blog post.
==============================================================*/
const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;

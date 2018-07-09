const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*==============================================================
// The schema that defines the structure of a blog post.
==============================================================*/
const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;

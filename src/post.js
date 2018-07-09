const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*==============================================================
// The schema that defines the structure of a single post.
==============================================================*/
const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;

const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

/*==============================================================
// The schema that defines the structure of a user.
==============================================================*/
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// Getter function
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// Middleware for pre remove
UserSchema.pre('remove', function() {
  const BlogPost = mongoose.model('blogPost');
  // Go through all blogPosts. If their ID is in the match, then remove it
  BlogPost.remove({ _id: { $in: this.blogPosts }})
    .then(() => next()); // When done, go on to next middleware or end if none exists
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

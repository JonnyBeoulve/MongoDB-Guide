const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assocations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    // Setup associations
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // Save declarations to database.    
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts') // Go find blogposts and toss data into results
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts', // Inside what we fetch, we want this additional resource
        populate: { // Inside the path, further go inside and load additional association
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
        .then((user) => {
          assert(user.name === 'Joe');
          assert(user.blogPosts[0].title === 'JS is Great');
          assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
          assert(user.blogPosts[0].comments[0].user.name === 'Joe');
          done();
      })
  })
});

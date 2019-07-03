module.exports = function(app) {
  var galleryList = require('../controllers/noonGalleryController');

  // posts Routes
  app.route('/posts') 
    .get(galleryList.list_all_posts); //get all the post

  app.route('/posts/liked') 
    .get(galleryList.list_all_liked_posts); //get all post that user liked

  app.route('/post/like/:postId')
    .put(galleryList.like_post); //set post like status
};
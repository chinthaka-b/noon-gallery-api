'use strict';

var Storage = require('node-storage');
var postsStore = new Storage('data/posts.json');
  

exports.list_all_posts = function(req, res) {
   res.json(postsStore.get('posts'));
};

exports.like_post = function(req, res) {
	let allPosts = postsStore.get('posts');
	allPosts = JSON.parse(allPosts);

	let index = allPosts.findIndex(post => {
		return (req.params.postId == post.id);
	})

	allPosts[index].userLiked = req.body.status;

	postsStore.remove('posts');
	postsStore.put('posts', JSON.stringify(allPosts));

    res.json(allPosts[index]);
};

exports.list_all_liked_posts = function(req, res) {

	let allPosts = postsStore.get('posts');
	let likedPost = JSON.parse(allPosts).filter(post => {
		return (post.userLiked == true);
	})

	res.json(likedPost);
};
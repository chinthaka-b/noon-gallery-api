'use strict';

const getDb = require("../../db/db").getDb;
const initDb = require("../../db/db").initDb;
// let Storage = require('node-storage');
// let postsStore = new Storage('data/post_data.json');
  
exports.list_all_posts = function(req, res) {

	console.log('list_all_posts')
	const db = getDb();
	db.collection('posts').get()
	  .then((snapshot) => {
	  	console.log('data reding ..');
	  	let posts;
	    snapshot.forEach((doc) => {
	    	if(posts == undefined){

	    		posts = [doc.data()];
	    	}
	    	else{
	    		posts.push(doc.data())
	    	}
	    });

		res.json(posts);
	  })
	  .catch((err) => {
	    console.log('Error getting documents', err);
		res.json(err);
	  });
};

function updateLike(postId, status)
{
	const db = getDb(); //db instance

	let postsRef = db.collection('posts').doc(postId)
	let updateSingle = postsRef.update({userLiked:(status === true)});

	return Promise.all([updateSingle]).then(res => {
		console.log('Update: ', res);
	});
}

exports.like_post = function(req, res) {

	updateLike(req.params.postId, req.body.status)
	.then((promis) => {
		res.json('updated!');
	})
};

exports.list_all_liked_posts = function(req, res) {
	const db = getDb(); //db instance

	let postsRef = db.collection('posts');
	let getLiked = postsRef.where('userLiked','==', true).get()
	.then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        res.json([]);
      }  
      
      let liked;
      snapshot.forEach((doc) => {
      	if(liked == undefined)
      		liked = [doc.data()];
      	else
      		liked.push(doc.data());
      });
      res.json(liked); ;

    })
    .catch(err => {
      	console.log('Error getting documents', err);
      	res.json('Error : ' + err); ;
    });
};
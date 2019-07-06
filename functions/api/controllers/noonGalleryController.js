'use strict';

const getDb = require("../../db/db").getDb;
const initDb = require("../../db/db").initDb;

/**
 * get all posts list
 * @param  req 
 * @param  res
 * @return json
 */
exports.list_all_posts = function(req, res) {

	const db = getDb();
	db.collection('posts').get() //get all post
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

		res.json(posts); //return all the post as a json 
	  })
	  .catch((err) => {
	    console.log('Error getting documents', err);
		res.json(err);
	  });
};


/**
 * update post like status
 * @param  {[type]} postId [description]
 * @param  {[type]} status [description]
 * @return {[type]}        [description]
 */
function updateLike(postId, status)
{
	const db = getDb(); //db instance

	let postsRef = db.collection('posts').doc(postId) //find by POST id
	let updateSingle = postsRef.update({userLiked:(status === true)}); //update user like status

	return Promise.all([updateSingle]).then(res => {
		console.log('Update: ', res);
	});
}


/**
 * update like route
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.like_post = function(req, res) {

	updateLike(req.params.postId, req.body.status)
	.then((promis) => {
		res.json('updated!'); //return if success
	})
};


/**
 * list all liked posts
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.list_all_liked_posts = function(req, res) {
	const db = getDb(); //db instance

	let postsRef = db.collection('posts');
	let getLiked = postsRef.where('userLiked','==', true).get() //get all where user liked
	.then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        res.json([]); //return empty array if user has not liked any posts
      }  
      
      let liked;
      snapshot.forEach((doc) => {
      	if(liked == undefined)
      		liked = [doc.data()];
      	else
      		liked.push(doc.data());
      });
      res.json(liked); //return liked posts

    })
    .catch(err => {
      	console.log('Error getting documents', err);
      	res.json('Error : ' + err); ; //return if there's any errors
    });
};
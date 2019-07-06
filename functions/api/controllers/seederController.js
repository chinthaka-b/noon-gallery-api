'use strict';

const getDb = require("../../db/db").getDb;
const initDb = require("../../db/db").initDb;


/**
 * initial db seeder
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.data_seeder = function(req, res) {
	console.log('data_seeder');
	
	let posts = getPosts();

	let db = getDb()
	let setPost = db.collection('posts').doc('one').set(posts[0]);
	let setPost2 = db.collection('posts').doc('two').set(posts[1]);
	let setPost3 = db.collection('posts').doc('three').set(posts[2]);

	console.log('saveing');
	setPost.then(r => {
	    console.log('Set: ', r);
	  });
	setPost2.then(r => {
	    console.log('Set: ', r);
	  });
	setPost3.then(r => {
	    console.log('Set: ', r);
		res.json('success!')
	});

	initDb(function (err, db) {});
};


/**
 * dummy post data
 * @return {[type]} [description]
 */
function getPosts(){
		return [
		    {
		    	"id": 1,
		    	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		    	"likes":20,
		    	"hashtags" : ["toyota","corolla","E90"],
		    	"image" : {
		    		"title": "AE92",
			    	"description": "Toyota Corolla Sedan",
			    	"imgUrl": "../static/img-1.jpeg"
		    	},
		    	"user" : {
			    	"picUrl" : "../static/profile-2.jpg",
			    	"name" : "iambatman"
		    	},
		    	"userLiked" : false
		    },
		    {
		    	"id": 2,
		    	"description": "Cras malesuada eu magna vitae pharetra. Donec tempus ipsum in lacinia iaculis.",
		    	"likes":15,
		    	"hashtags" : ["datsun","510","sss"],
		    	"image": {
		    		"title": "SSS",
		    		"description" : "Datsun 510",
		    		"imgUrl": "../static/img-5.jpeg"
		    	},
		    	"user" : {
			    	"picUrl" : "../static/profile-1.jpg",
			    	"name" : "jarvis"
		    	},
		    	"userLiked" : false
		    },
		    {
		    	"id": 3,
		     	"description": "Donec sit amet justo ut nisl pulvinar dapibus. Praesent placerat turpis at turpis rhoncus pharetra.",
		    	"likes":35,
		    	"hashtags" : ["trueno","hachiRoku","panda","corolla","initialD"],
		     	"image": {
		    		"title": "Trueno",
		     		"description": "Toyota Corolla",
		    		"imgUrl": "../static/img-7.jpeg"
		     	},
		     	"user" : {
			    	"picUrl" : "../static/profile-3.png",
			    	"name" : "sultanofspeed"
		     	},
		    	"userLiked" : false
		    }
		];
	}
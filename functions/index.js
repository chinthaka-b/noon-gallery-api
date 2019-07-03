const functions = require('firebase-functions'),
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require('body-parser'),
  fs = require('fs')
  cors = require('cors');
  /*serviceAccount = require('./ServiceAccountKey.json');*/

const initDb = require("./db/db").initDb;
const getDb = require("./db/db").getDb;
// const seeder = require('./api/controllers/seederController');
  // Storage = require('node-storage');

  /*const admin = require('firebase-admin');

  admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount)
	});

  const db = admin.firestore();*/



  /*let docRef = db.collection('users').doc('alovelace');

	let setAda = docRef.set({
	  first: 'Ada',
	  last: 'Lovelace',
	  born: 1815
	});


	db.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });*/

  // 

// var posts = new Storage('post_data/post_data.json');

// console.log(posts.get('posts'));

/*if(posts.get('posts') != undefined)
{
	posts.remove('posts')
}*/

/*fs.readFile('post_data/data.json', 'utf8', function(err, contents) {
	// console.log(err);
	console.log(contents);
	console.log(JSON.stringify(contents));
	if(err){
		exports.app = functions.https.onRequest((request, response) => {
 			response.send(err);
		});
	}
	else{
		// posts.put('posts', contents);
		// console.log(posts.get('posts'));
	}
})*/

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/noonGalleryRoutes'); //importing route
routes(app); //register the route


// seeder.data_seeder();

initDb(function (err, dd) {
	console.log('noon gallery RESTful API server started on');

	// const db = getDb();
	const db = dd;

	/*let docRef = db.collection('users').doc('alovelace');

	let setAda = docRef.set({
	  first: 'Ada',
	  last: 'Lovelace',
	  born: 1815
	});

	setAda.then((test) => {
		console.log(test);

	})

	let aTuringRef = db.collection('users').doc('aturing');

	let setAlan = aTuringRef.set({
	  'first': 'Alan',
	  'middle': 'Mathison',
	  'last': 'Turing',
	  'born': 1912
	});*/


	/*db.collection('users').get()
		  .then((snapshot) => {
		  	console.log('data reding ..');
		    snapshot.forEach((doc) => {
		      console.log(doc.id, '=>', doc.data());
		    });
		  })
		  .catch((err) => {
		    console.log('Error getting documents', err);
		  });*/

	exports.app = functions.https.onRequest(app);
    /*app.listen(port, function (err) {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port " + port);
    });*/
});

// app.listen(port);


// express.app = functions.https.onRequest(app);

const functions = require('firebase-functions'),
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require('body-parser'),
  fs = require('fs')
  cors = require('cors');

const initDb = require("./db/db").initDb; //init db function
const getDb = require("./db/db").getDb; //get db connection if already init

app.use(cors()); //to overcome CORS issue
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/noonGalleryRoutes'); //importing route
routes(app); //register the route

initDb(function (err, dd) { //init db connection
	console.log('noon gallery RESTful API server started on');

	const db = dd;
	exports.app = functions.https.onRequest(app);
});
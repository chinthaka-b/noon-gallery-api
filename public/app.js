var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require('body-parser'),
  fs = require('fs')
  cors = require('cors');


var Storage = require('node-storage');
var posts = new Storage('data/posts.json');

console.log(posts.get('posts'));

if(posts.get('posts') != undefined)
{
	posts.remove('posts')
}
fs.readFile('data/data.json', 'utf8', function(err, contents) {
	posts.put('posts', contents);
	console.log(posts.get('posts'));
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/noonGalleryRoutes'); //importing route
routes(app); //register the route


// app.listen(port);
express.app = function.http.onRequest(app);

console.log('noon gallery RESTful API server started on: ' + port);
var seeder = require('mongoose-seeder'),
    data = require('../../data/data.json'),
	Post = mongoose.model('Posts');

exports.data_seeder = function(req, res) {

	Post.find({}, function(err, posts) {
		if (err)
	  		res.send(err);

		if(posts.length == 0){
			seeder.seed(data).then(function(dbData) {
			    // The database objects are stored in dbData
			}).catch(function(err) {
				console.log(err);
			    // handle error
			});
		}
	}
});

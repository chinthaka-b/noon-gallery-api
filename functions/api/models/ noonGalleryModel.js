'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  {
    description: {
      type : String
    } 
    likes: {
      type : Number
    },
    hashtags : {
      type : Array
    },
    image: {
      title: {type : String},
      description: {type : String},
      imgUrl: {type : String},
    },
    user : {
      picUrl : {type : String},
      name : {type : String},
    },
    userLiked : {type : Boolean}
  }
});

module.exports = mongoose.model('Posts', PostSchema);
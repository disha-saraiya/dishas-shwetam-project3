var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
   createdAt: { type: Date, default: Date.now }, 
   content: String, 
   userId: mongoose.Schema.Types.ObjectId,
   postId: mongoose.Schema.Types.ObjectId 
}, {collection: 'comments'}); 

module.exports = CommentsSchema;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    createdAt: { type: Date, default: Date.now }, 
   content: String, 
   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}, 
}, {collection: 'comments'}); 

module.exports = CommentsSchema;

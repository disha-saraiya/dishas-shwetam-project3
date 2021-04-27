var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostsSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    createdAt: { type: Date, default: Date.now }, 
    title: String, 
    description: String, 
    isHidden: Boolean, 
    isReported: Boolean, 
    user: Object,
    comments:[{commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'CommentsSchema'}}]
}, {collection: 'posts'}); 

module.exports = PostsSchema;
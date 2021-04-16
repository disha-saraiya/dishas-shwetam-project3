const Schema = require('mongoose').Schema;

exports.PostsSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
   createdAt: Date.now, 
   title: String, 
   description: String, 
   isHidden: Boolean, 
   isReported: Boolean, 
   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}, 
   comments:[{commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'CommentsSchema'}}]
}, {collection: 'posts'}); 
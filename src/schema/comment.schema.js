const Schema = require('mongoose').Schema;

exports.CommentsSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
   createdAt: Date.now, 
   content: String, 
   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}, 
}, {collection: 'comments'}); 
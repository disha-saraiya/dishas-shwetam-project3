var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    userName: String, 
    emailId: String, 
    password: String, 
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    isActive: Boolean
}, {collection: 'users'}); 

module.exports = UserSchema;
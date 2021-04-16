
const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
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
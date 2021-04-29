let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    userName: String, 
    firstName: String, 
    lastName: String, 
    emailId: String, 
    password: String, 
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    isActive: Boolean
}, {collection: 'users'}); 



//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

module.exports = UserSchema;
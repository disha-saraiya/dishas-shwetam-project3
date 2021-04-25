var mongoose = require('mongoose');
var UserSchema = require('./user.model');
var bcrypt = require('bcrypt');


UserSchema.statics = {
    create : function(data, cb) {
        var user = new this(data);
        user.save(cb);
    },

    get: function(username) {
        return this.findOne({userName: username}).exec();
    },

    getByEmail: function(email,cb){
        return this.findOne({emailId: email},cb); 
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var userModel = mongoose.model('User', UserSchema);
module.exports = userModel;
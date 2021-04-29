let mongoose = require('mongoose');
let UserSchema = require('./user.model');
let bcrypt = require('bcrypt');


UserSchema.statics = {
    create : function(data, cb) {
        let user = new this(data);
        user.save(cb);
    },

    get: function(username) {
        return this.findOne({userName: username}).exec();
    },

    getByEmail: function(email,cb){
        return this.findOne({emailId: email}, cb); 
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }, 

    authenticate: function(email, password, callback){
        return this.findOne({emailId: email}, function(err, user){
            if(err){
                return callback(err)
            }else if (!user){
                let err = new Error('User not found');
                err.status = 401; 
                return callback(err); 
            }
            console.log(user); 
            console.log(password);
            bcrypt.compare(password, user.password, function(err, result){
                if(result === true){
                    return callback(null, user); 
                }else{
                    return callback(); 
                }
            })
        });
    }
}

let userModel = mongoose.model('User', UserSchema);
module.exports = userModel;
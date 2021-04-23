var mongoose = require('mongoose');
var PostsSchema = require('./posts.model');

PostsSchema.statics = {
    create : function(data, cb) {
        var posts = new this(data);
        posts.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
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

var postsModel = mongoose.model('Posts', PostsSchema);
module.exports = postsModel;
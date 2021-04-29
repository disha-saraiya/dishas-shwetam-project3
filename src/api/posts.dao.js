let mongoose = require('mongoose');
let PostsSchema = require('./posts.model');

PostsSchema.statics = {
    create : function(data, cb) {
        let posts = new this(data);
        posts.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }, 
}

let postsModel = mongoose.model('Posts', PostsSchema);
module.exports = postsModel;
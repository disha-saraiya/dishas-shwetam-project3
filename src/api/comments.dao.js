let mongoose = require('mongoose');
let CommentsSchema = require('./comments.model');

CommentsSchema.statics = {
    create : function(data, cb) {
        let comments = new this(data);
        comments.save(cb);
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

let commentsModel = mongoose.model('Comments', CommentsSchema);
module.exports = commentsModel;
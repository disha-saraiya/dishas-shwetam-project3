var mongoose = require('mongoose');
var CommentsSchema = require('./comments.model');

CommentsSchema.statics = {
    create : function(data, cb) {
        var comments = new this(data);
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

var commentsModel = mongoose.model('Comments', CommentsSchema);
module.exports = commentsModel;
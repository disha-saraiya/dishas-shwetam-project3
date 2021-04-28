var Comments = require('./comments.dao');
var Posts = require('./posts.dao');

exports.createComment = function (req, res, next) {
    // https://stackoverflow.com/questions/26156687/mongoose-find-update-subdocument
    var comment = {
       userId: req.body.userId,
       content: req.body.content, 
       postId: req.body.postId
    };
    Comments.create(comment, function(err, comment) {
        if(err) {
            res.json({
                error : err
            })
        }else{
            Posts.findOneAndUpdate({"_id": req.body.postId}, {"$push": {comments: comment}},   function(err,doc) {
                next(); 
            });
            return res.status(200).json(comment); 
        }
    })
    
}
        
exports.getComments = function(req, res, next) {
    Comments.get({}, function(err, comments) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            comments: comments
        })
    })
}

exports.getComment = function(req, res, next) {
    Comments.get({name: req.params.name}, function(err, comments) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            comments: comments
        })
    })
}

exports.updateComment = function(req, res, next) {
    var comment = {
        userId:req.body.userId,
        content:req.body.content
    }
    Comments.updateOne({_id: req.params.id}, comment, function(err, comment) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "comment updated successfully"
        })
    })
}

exports.removeComment = function(req, res, next) {
    Comments.delete({_id: req.params.id}, function(err, comment) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Comment deleted successfully"
        })
    })
}


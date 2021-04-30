let Comments = require('./comments.dao');
let Posts = require('./posts.dao');

exports.createComment = function (req, res, next) {
    // https://stackoverflow.com/questions/26156687/mongoose-find-update-subdocument
    let comment = {
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
            Posts.findOneAndUpdate({"_id": req.body.postId}, {"$push": {comments: comment}},
               function(err,doc) {
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
    let newComment = {
        _id: req.params.commentId,
        content: req.body.content, 
    } 
    Comments.findOneAndUpdate({_id: req.params.commentId}, newComment, function(err, comment) {
        if(err) {
            res.json({
                error : err
            })
        }else{
            newComment = {
                _id: comment._id, 
                content: req.body.content, 
                createdAt: comment.createdAt, 
                postId: comment.postId, 
                userId: comment.userId
            }
            Posts.updateOne({"_id" : req.params.postId, "comments": {
                "$elemMatch": {"_id": req.params.commentId}
            }}, {"$set" : {"comments.$.content" : newComment.content}}, function(err, response){
                if(err){
                console.log(err); 
                next(); 
                }else{
                    console.log(response); 
                    res.status(200).json({
                        message : "comment updated successfully",
                        comment: newComment
                })
            }
            });           
        }}
        )   }

exports.removeComment = function(req, res, next) {
    Comments.delete({_id: req.params.commentId}, function(err, comment) {
        if(err) {
            res.json({
                error : err
            })
        }else{
            Posts.findOneAndUpdate({"_id": req.params.postId}, 
            {"$pull": {comments: comment}}, function(err,doc) {
                next(); 
            });
            console.log(comment);
            return res.status(200).json({
                message : "Comment deleted successfully",
                comment: comment
            })
        }
    })
}


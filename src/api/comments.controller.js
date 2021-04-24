var Comments = require('./comments.dao');

exports.createComment = function (req, res, next) {
    var comment = {
       userId:req.body.userId,
       content:req.body.content
    };

    Comments.create(comment, function(err, comment) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Comments created successfully"
        })
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
    Comments.update({_id: req.params.id}, comment, function(err, comment) {
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
var Posts = require('./posts.dao');


exports.createPost = function (req, res, next) {
    console.log(req.session.user._id); 
    var post = {
        title: req.body.title, 
        description: req.body.description, 
        user: req.session.user,
        isHidden: false, 
        isReported: false
    };

    Posts.create(post, function(err, post) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Post created successfully"
        })
    })
}

exports.getPosts = function(req, res, next) {
    Posts.get({}, function(err, posts) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            posts: posts
        })
    })
}

exports.getPost = function(req, res, next) {
    Posts.get({name: req.params.name}, function(err, posts) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            posts: posts
        })
    })
}

exports.updatePost = function(req, res, next) {
    var post = {
        title: req.body.title, 
        description: req.body.description, 
        isHidden: false, 
        isReported: false, 
        userId: req.body.userId,
//commentId:req.body.commentId;
   }
    Posts.update({_id: req.params.id}, post, function(err, post) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Post updated successfully"
        })
    })
}

exports.removePost = function(req, res, next) {
    Posts.delete({_id: req.params.id}, function(err, post) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Post deleted successfully"
        })
    })
}
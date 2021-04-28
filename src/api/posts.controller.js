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
            message : "Post created successfully",
            post: post
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

// exports.addCommentToPost = function(req, res, next) {
//     var commentId = req.body.commentId; 
//     var postId = req.params.postId; 

//     Posts.updateComment((postId, commentId), function(err, post){

//     })
//     return res.status(200).json({message: 'comment added'})

// }

exports.updatePost = function(req, res, next) {
    Posts.updateComment(req.params.postId, req.body.commentId , function(err, post) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Post updated successfully",
            post:post
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

exports.getPostComments = function(req, res){
    Posts.findOne({"_id": req.params.postId}, function(err, post){
        console.log(post); 
        if(err){
            res.status(404).json({err: "No comments found for this post"})
        }
        res.status(200).json({
            comments : post.comments, 
        })
    }) 
}
let Posts = require('./posts.dao');


exports.createPost = function (req, res, next) {
    console.log(req.session.user._id); 
    let post = {
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


exports.updatePost = function(req, res, next) { 
    let post = {
        title: req.body.title, 
        description: req.body.description 
   }
    Posts.findOneAndUpdate({"_id": req.params.postId}, {"title": req.body.title, 
        "description": req.body.description }, function(error, response){
        console.log(post); 
        if(error) {
            res.status(404).json({
                error : "No such post found"
            })
        }else{
            res.status(200).json({
                message : "Post updated successfully",
                post: response
            })
        }
    })
}

exports.removePost = function(req, res, next) {
    Posts.delete({_id: req.params.id}, function(err, post) {
        if(err) {
            res.status(404).json({
                error : "Post not found"
            })
        }
        res.status(200).json({
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
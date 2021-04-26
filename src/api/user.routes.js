var Users = require('./user.controller');
var Comments = require('./comments.controller');
var Posts = require('./posts.controller');

module.exports = function(router) {
    router.post('/create', Users.createUser);
    router.get('/get', Users.getUsers);
    router.get('/get/:name', Users.getUser);
    router.put('/update/:id', Users.updateUser);
    router.delete('/remove/:id', Users.removeUser);
    router.post('/posts/create',Users.requireAuth, Posts.createPost);
    router.get('/posts/get', Posts.getPosts);
    router.get('/posts/get/:name', Posts.getPost);
    router.put('/posts/update/:id', Posts.updatePost);
    router.delete('/posts/remove/:id', Posts.removePost);
    router.post('/comments/create', Comments.createComment);
    router.get('/comments/get', Comments.getComments);
    router.get('/comments/get/:name', Comments.getComment);
    router.put('/comments/update/:id', Comments.updateComment);
    router.delete('/comments/remove/:id', Comments.removeComment);

    router.post('/login',Users.login);
    //router.get('/authchecker', Users.authChecker);
}
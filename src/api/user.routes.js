var Users = require('./user.controller');
var Comments = require('./comments.controller');
var Posts = require('./posts.controller');

module.exports = function(router) {
    router.post('/create', Users.createUser);
    router.get('/get', Users.getUsers);
    router.get('/get/:name', Users.getUser);
    router.put('/update/:id', Users.updateUser);
    router.delete('/remove/:id', Users.removeUser);
    router.post('/posts/create', Users.requireAuth , Posts.createPost);
    router.get('/posts/get', Posts.getPosts);
    router.get('/posts/get/:name',Users.requireAuth, Posts.getPost);
    router.put('/posts/update/:id', Users.requireAuth, Posts.updatePost);
    router.delete('/posts/remove/:id', Users.requireAuth, Posts.removePost);
    router.put('/posts/addComment/:postId', Users.requireAuth, Posts.updatePost);
    router.get('/posts/comments/:postId', Users.requireAuth, Posts.getPostComments);
    router.post('/comments/create', Users.requireAuth, Comments.createComment);
    router.get('/comments/get', Users.requireAuth, Comments.getComments);
    router.get('/comments/get/:name', Users.requireAuth, Comments.getComment);
    router.put('/comments/update/:id', Users.requireAuth, Comments.updateComment);
    router.delete('/comments/remove/:id', Users.requireAuth, Comments.removeComment);

    router.post('/login',Users.login);
    router.post('/logout', Users.logout)
    router.post('/authorize', Users.isAuth)
}
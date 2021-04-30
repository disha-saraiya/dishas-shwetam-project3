let Users = require('./user.controller');
let Comments = require('./comments.controller');
let Posts = require('./posts.controller');

//https://stackoverflow.com/questions/39153460/whats-the-difference-between-findoneandupdate-and-findoneandreplace#:~:text=The%20findOneAndUpdate%20searches%20the%20document,in%20the%20given%20update%20document.&text=The%20findOneAndReplace%20searches%20the%20document,of%20the%20given%20replacement%20document.
module.exports = function(router) {
    //User routes
    router.post('/login',Users.login);
    router.post('/logout', Users.logout)
    router.post('/authorize', Users.isAuth)

    router.post('/create', Users.createUser);
    router.get('/get', Users.getUsers);
    router.get('/get/:name', Users.getUser);
    router.delete('/remove/:id', Users.removeUser);
    
    //Posts routes
    router.post('/posts/create', Users.requireAuth , Posts.createPost);
    router.get('/posts/get', Posts.getPosts);
    router.get('/posts/get/:name',Users.requireAuth, Posts.getPost);
    router.put('/posts/update/:id', Users.requireAuth, Posts.updatePost);
    router.delete('/posts/remove/:id', Users.requireAuth, Posts.removePost);
    router.patch('/posts/update/:postId', Users.requireAuth, Posts.updatePost);
    router.get('/posts/comments/:postId', Users.requireAuth, Posts.getPostComments);
    
    //Comments routes
    router.post('/comments/create', Users.requireAuth, Comments.createComment);
    router.get('/comments/get', Users.requireAuth, Comments.getComments);
    router.get('/comments/get/:name', Users.requireAuth, Comments.getComment);
    router.patch('/comments/update/:postId/:commentId', Users.requireAuth, Comments.updateComment);
    router.delete('/comments/remove/:postId/:commentId', Users.requireAuth, Comments.removeComment);

}
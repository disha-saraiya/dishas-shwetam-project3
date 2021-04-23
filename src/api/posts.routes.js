var Posts = require('./posts.controller');

module.exports = function(router) {
    router.post('/posts/create', Posts.createPost);
    router.get('/posts/get', Posts.getPosts);
    router.get('/posts/get/:name', Posts.getPost);
    router.put('/posts/update/:id', Posts.updatePost);
    router.delete('/posts/remove/:id', Posts.removePost);
}
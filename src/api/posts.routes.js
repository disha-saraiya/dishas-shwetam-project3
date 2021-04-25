var Posts = require('./posts.controller');
const cookieMiddleware = require('./middleware/cookie.middleware')


module.exports = function(router) {
    router.post('/posts/create', Posts.createPost);
    router.get('/posts/get', cookieMiddleware, Posts.getPosts);
    router.get('/posts/get/:name', Posts.getPost);
    router.put('/posts/update/:id', Posts.updatePost);
    router.delete('/posts/remove/:id', Posts.removePost);
}
var Comments = require('./comments.controller');

module.exports = function(router) {
    router.post('/comments/create', Comments.createComment);
    router.get('/comments/get', Comments.getComments);
    router.get('/comments/get/:name', Comments.getComment);
    router.put('/comments/update/:id', Comments.updateComment);
    router.delete('/comments/remove/:id', Comments.removeComment);
}
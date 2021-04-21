var Users = require('./user.controller');

module.exports = function(router) {
    router.post('/createUser', Users.createUser);
    router.get('/getUsers', Users.getUsers);
    router.get('/getUser/:name', Users.getUser);
    router.put('/updateUser/:id', Users.updateUser);
    router.delete('/removeUser/:id', Users.removeUser);
}
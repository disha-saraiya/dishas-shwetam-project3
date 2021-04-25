var Users = require('./user.dao');
const jwt = require('jsonwebtoken');

exports.createUser = function (req, res, next) {
    var user = {
        username: req.body.username,
        emailId: req.body.emailId,
        password:req.body.password,
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        isActive:true
    };


    Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.cookie({
            webtoken:jwt.sign({username: user.username}, 'scented_candle')
        })
        res.json({
            status:200,
            message:"User created successfully"
        })
    })
}

exports.getUsers = function(req, res, next) {
    Users.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }  
        res.json({
            users: users
        })
    })
}

exports.getUser = function(req, res, next) {
    Users.get({name: req.params.name}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.cookie({
            users: jwt.sign({username:users.username},"scented_candle")
        })
        res.json({
            status:200,
            message:"User logged in successfully",
            users: users.username
        })

    })
}

exports.updateUser = function(req, res, next) {
    var user = {
        username: req.body.username,
        emailId: req.body.emailId,
        password:req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive:true
    }
    Users.updateOne({_id: req.params.id}, user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User updated successfully"
        })
    })
}

exports.removeUser = function(req, res, next) {
    Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User deleted successfully"
        })
    })
}

exports.login = function(req, res, next) {
    // const username = req.body.username;
    const email = req.body.email; 
    const password = String(req.body.password);

    if (!email || !password) {
        res.sendStatus(400);
    }

    return Users.getByEmail(email)
        .then((response) => {
            console.log(response);
            console.log(password);

            if (response.password !== password) {
                return res.status(402).send("Password does not match");
            }
            else{
                const loggedInUser = {
                    id:response._id,
                    username:response.userName,
                    email:response.emailId,
                    firstName:response.firstName,
                    lastName:response.lastName,
                    createdAt:response.createdAt
                }

                const token = jwt.sign(loggedInUser , 'scented_candle')
                res.cookie('webdevtoken', token).status(200).send(response);
            }
        }, (error) => {
            res.status(401).send(error)
        });
 }

 // router.post('/loggedIn', cookie_middleware (req, res) => {
//     if (req.username) {
//         res.send(true);
//     } else {
//         res.send(false);
//     }
// })

// router.post('/logOut', (req, res) => {
//     res.clearCookie('webdevtoken');
//     res.sendStatus(200);
// })





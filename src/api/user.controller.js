var Users = require('./user.dao');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.createUser = function (req, res, next) {
    var user = {
        username: req.body.username,
        emailId: req.body.emailId,
        password:req.body.password,
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        isActive:true
    };

    const loggedInUser = {
        id:user._id,
        username:user.userName,
        email:user.emailId,
        firstName:user.firstName,
        lastName:user.lastName,
        createdAt:user.createdAt
    }

    /*
    bcrypt.hash(user.password, 10, function (err, hash) {
      user.password = hash;
    });*/

    Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        
        res.cookie({
            webdevtoken:jwt.sign(loggedInUser , 'scented_candle')
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



// GET /logout
exports.logout = function(req, res, next) {
    if (req.session!==null) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
            res.status(400);
            res.json({
                status:400,
                error : "User still loggedin"
            });
        } else {
            res.status(200);
            res.json({
                message : "User logged out successfully"
            });
        }
      });
    }
}

exports.login = function(req, res, next) {
    // const username = req.body.username;
    const email = req.body.emailId; 
    const password = String(req.body.password);

    if (!email || !password) {
        res.sendStatus(400);
    }

    var loggedInUser ;

    return Users.getByEmail(email,function(err, user) {
        if(!user || err){
            res.status(400);
            res.json({
                status:400,
                error : "User not present"
            })
        }
        else{
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    res.status(200);
                    res.json({
                        loggedInUsers:loggedInUser,
                        message : "User authenticated successfully"
                    })
                } else {
                    res.status(402);
                    res.json({
                        status:402,
                        message : "Passwords do not match"
                    })
                }
            });
        }
    });
        
        
        
        
        /*){
            console.log("Email"+response.emailId);
            console.log(response.user);
            if (response.emailId) {
                res.status(402).send("User not present");
            }
            else{
                bcrypt.compare(password, response.password, function (err, result) {
                if (result === true) {
                    res.status(200).send("Password match");
                } else {
                    res.status(402).send("Password does not match");
                }
              })
            }
            }, (error) => {
            es.status(401).send(error)*/
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





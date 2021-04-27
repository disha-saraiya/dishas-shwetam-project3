var Users = require('./user.dao');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.createUser = function (req, res, next) {
    var user = {
        userName: req.body.username,
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
    const email = req.body.email; 
    const password = String(req.body.password);

    if (!email || !password) {
        res.sendStatus(400);
    }

    return Users.authenticate(email, password, function(error, user){
        if(error || !user){
            var err = new Error('Please enter the correct email or password.'); 
            err.status = 401; 
            return next(err); 
        }else{
            req.session.user = user; 
            console.log('logged in');             
            return res.status(200).send(user);         
        }
    });
}

//Middleware for authentication 
exports.requireAuth = (req,res,next) => {
    let user = req.session.user;
    console.log(req.session);
    console.log(req.session.user);
    if(!user){
      return res.status(403).json({message : 'Forbidden for further use'});
    }
    next();
}

//Function to check whether user has logged in before rendering certain pages. 
exports.isAuth = (req, res) => {
    if(req.session.user){
        return res.status(200).json(req.session.user)
    }    
    return res.status(401).json({message: 'Unauthorized'})
}


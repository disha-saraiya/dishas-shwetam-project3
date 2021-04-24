var Users = require('./user.dao');
const jwt = require('jsonwebtoken');

exports.createUser = function (req, res, next) {
    var user = {
        userName: req.body.userName,
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
            webtoken:jwt.sign({userName:users.userName}, 'scented_candle')
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
            users: jwt.sign({userName:users.userName},"scented_candle")
        })
        res.json({
            status:200,
            message:"User logged in successfully",
            users: users.userName
        })

    })
}

exports.updateUser = function(req, res, next) {
    var user = {
        userName: req.body.userName,
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
    const username = req.body.username;
    const password = String(req.body.password);

    if (!username || !password) {
        res.sendStatus(400);
    }

    return Users.get(username)
        .then((response) => {
            console.log(response);
            console.log(password);

            if (response.password !== password) {
                return res.status(402).send("Password does not match");
            }

            const token = jwt.sign(response.username, 'salty_salt')


            res.cookie('webdevtoken', token).status(200).send(response);
        }, (error) => {

            res.status(401).send(error)
        });
 }

/*
 exports.login = function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;

    if (!userName || !password) {
        res.sendStatus(400);
    }

    return Users.get(req.body.userName,function(err, user) {
        let passwordMatch = true;
        if(password !== user.password){
            passwordMatch = false;    
            err = "Passwords do not match";
        }
        
        if(err || !passwordMatch) {
            res.json({
                error : err,
                status: 401
            })
        }
        else{
           res.json({
                token : jwt.sign({userName: response.userName}, 'scented_candle'),
                message : "User loggedin successfully",
                status : 200
        })
    }
    })
 }
*/




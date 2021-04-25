const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    //const wdt = req.cookies.webdevtoken;
    const username = req.session.username; 
    if(!username){
        res.status(401).send('Unauthorized: No session available');
    }else{
        req.username = username;
        next();
    }

    // if (!wdt) {
    //     return res.status(401).send("No valid web dev token given")
    // } else {
    //     jwt.verify(wdt, 'scented_candle', function(error, decoded_token) {
    //         if (error) {
    //             return response.status(499).send("Invalid token");
    //         } else {
    //             req.username = decoded_token.username;
    //             req.id = decoded_token.id;
    //             next();
    //         }
    //     })
    // }
}
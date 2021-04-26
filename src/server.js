var express = require('express');
const path = require('path');

//var log = require('morgan')('dev');
var bodyParser = require('body-parser');

var cors = require('cors');
var mongoose = require('mongoose');
//session maintenance
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);


var properties = require('./config/properties');
var db = require('./config/database');
//hero routes
var herosRoutes = require('./api/user.routes');
const userRoutes = require('./api/user.routes');
//authentication
const cookieParser = require('cookie-parser');

var app = express();
app.use(cors()); 

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router
var router = express.Router();

// call the database connectivity function
db();


//authentication
app.use(cookieParser());




//use sessions for tracking logins
app.use(session({
  secret: 'scented_candle',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection : mongoose.connection})
}));


// configure app.use()
//app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

// use express router
app.use('/api',router);
//call heros routing
userRoutes(router);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// intialise server
app.listen(properties.PORT);

app.use(session({secret: 'scented_candle'}));

const mongoose = require('mongoose');


// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb+srv://disha:cs5610@cluster-neu.2i4eo.mongodb.net/wellnessforum?retryWrites=true&w=majority';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

require('dotenv').config({ path: '.env' });

const mongoose = require('mongoose');

// Connect to our Database and handle any bad connections.
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);

// Tell Mongoose to use ES6 promises.
mongoose.Promise = global.Promise;

// Log database errors to the console.
mongoose.connection.on('error', err => {
  console.error(`Database connection error: ${err.message}`);
});

// Import all mongoDB models:
require('./models/Activity');

// Require our Express app
const app = require('./app');
app.set('port', 5000);

// Start the app!
const server = app.listen(app.get('port'), () => {
  console.log(`Express is running on port ${server.address().port}.`);
});

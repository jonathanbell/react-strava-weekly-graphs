require('dotenv').config({ path: '.env' });

const mongoose = require('mongoose');

// Connect to our Database and handle any bad connections.
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  // https://stackoverflow.com/a/39831825/1171790
  // Sets how many times to try reconnecting
  reconnectTries: 99999,
  // Sets the delay between every retry (milliseconds)
  reconnectInterval: 1000
});

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

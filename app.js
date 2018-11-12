const express = require('express');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const path = require('path');

const app = express();

// Mustache:
// We are only using express to serve our JSON API at the moment so none of
// these templates should ever get served (unless we hit a development error).
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

// Don't minify html.
app.locals.pretty = true;

// Passes variables to our templates and *all requests*.
app.use((req, res, next) => {
  res.locals.helpers = helpers;
  res.locals.currentPath = req.path;
  next();
});

// Redirect from non-www to www:
// https://zeit.co/docs/guides/redirect#2.-redirect-inside-your-app
app.use((req, res, next) => {
  // If the request doesn't come from our app or from the Zeit deployment URL:
  if (
    req.hostname === process.env.NOW_URL ||
    req.hostname === 'localhost' ||
    req.hostname === process.env.APP_HOST
  ) {
    next();
  } else {
    console.error(`${req.hostname} requested data from our API.`);
    // Return an error
    res.status(403);
    res.send('Please access this API from inside the application.');
  }

  return;
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
}

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname + 'client/public')));
}

// Handle all of our own routes
app.use('/', routes);

// Routes above^^^ didn't work. Probably a 404. Add "notFound" middleware.
app.use(errorHandlers.notFound);

// Really bad error... : |
if (process.env.NODE_ENV === 'development') {
  // Development error handler
  app.use(errorHandlers.developmentErrors);
}

if (process.env.NODE_ENV === 'production') {
  // Production error handler
  app.use(errorHandlers.productionErrors);
}

module.exports = app;

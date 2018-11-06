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
  // // If the request doesn't come from www.blizzardjudge.com or from localhost:
  // if (req.hostname !== process.env.APPHOST && req.hostname !== 'localhost') {
  //   // Redirect to www.blizzardjudge.com keeping the pathname and querystring intact.
  //   return res.redirect(`https://${process.env.APPHOST}${req.originalUrl}`);
  // }

  next();
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname + 'client/public')));
}

// Handle all of our own routes
app.use('/', routes);

// Routes above^^^ didn't work. Probably a 404. Add "notFound" middleware.
app.use(errorHandlers.notFound);

// Really bad error... : |
if (app.get('env') === 'development') {
  // Development error handler
  app.use(errorHandlers.developmentErrors);
}

if (app.get('env') === 'production') {
  // Production error handler
  app.use(errorHandlers.productionErrors);
}

module.exports = app;

const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const path = require('path');
const { catchErrors } = require('../handlers/errorHandlers');

/**
 * API Endpoints
 */

router.get(
  '/api/activity/:id',
  catchErrors(activityController.getActivityById)
);

router.get(
  '/api/weekly-graphs/:year',
  catchErrors(activityController.getActivitiesByTypeAndWeeklyDuration)
);

router.get(
  '/api/search',
  catchErrors(activityController.getActivitiesBySearchTerm)
);

router.get('/api/biggies', catchErrors(activityController.getBiggies));

// https://stackoverflow.com/a/19313369/1171790
if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

module.exports = router;

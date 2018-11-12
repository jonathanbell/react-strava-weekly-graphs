const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
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

module.exports = router;

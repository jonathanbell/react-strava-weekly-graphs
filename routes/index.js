const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { catchErrors } = require('../handlers/errorHandlers');

/**
 * API Endpoints
 */

router.get('/api/hello', (req, res) => {
  res.send({ express: 'Helloooooo From Express' });
});

router.get('/testing', catchErrors(activityController.getActivityById));

module.exports = router;

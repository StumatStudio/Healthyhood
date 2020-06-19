const express = require('express');
const crimeController = require('../controllers/crimeController');

const router = express.Router();

router.get('/data', crimeController.getCrimeData, (req, res) => {
  // on success, res.locals.crimedata will contain the Crime Data json blob
  console.log('router.get /crime/data', res.locals.crimedata);

  // currently returning the entire blob of data to the client
  // should consider reducing this to what is actually needed:
  // https://www.crimeometer.com/docs
  res.status(200).send(res.locals.crimedata);
});

router.get('/stats', crimeController.getCrimeStats, (req, res) => {
  // on success, res.locals.crimestats will contain the Crime Stats json blob
  console.log('router.get /crime/stats', res.locals.crimestats);

  // currently returning the entire blob of data to the client
  // should consider reducing this to what is actually needed:
  // https://www.crimeometer.com/docs
  res.status(200).send(res.locals.crimestats);
});

module.exports = router;

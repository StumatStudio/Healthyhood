const express = require('express');
const iqAirController = require('../controllers/iqAirController');

const router = express.Router();

router.get('/', iqAirController.getIqAirScore, (req, res) => {
  // on success, res.locals.iqairscore will contain the IQ Air json blob
  console.log('iqAir router.get /', res.locals.iqairscore);

  // currently returning the entire blob of data to the client
  // should consider reducing this to what is actually needed:
  // https://api-docs.airvisual.com/?version=latest
  res.status(200).send(res.locals.iqairscore);
});

module.exports = router;

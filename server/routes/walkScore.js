const express = require('express');
const walkScoreController = require('../controllers/walkScoreController');

const router = express.Router();

router.get('/', walkScoreController.getWalkScore, (req, res) => {
  // on success, res.locals.walkscore will contain the Walk Score json blob
  // on error:
  //  res.statusCode = http response
  //  res.statusMessage = status message
  //  res.locals.walkscore = status code
  console.log('router.get / walkscore', res.locals.walkscore);

  // currently returning the entire blob of data to the client
  // should consider reducing this to what is actually needed:
  // https://www.walkscore.com/professional/api.php
  res.status(res.statusCode).send(res.locals.walkscore);
});

module.exports = router;

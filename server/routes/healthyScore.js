const express = require('express');
const healthyScoreController = require('../controllers/healthyScoreController');

const router = express.Router();

router.get('/', healthyScoreController.calcHealthyScore, (req, res) => {
  // on success, res.locals.healthyscore will contain the Healthyhood Score
  console.log('router.get /healthyscore ', res.locals.healthyscore);
  res.status(200).send(res.locals.healthyscore);
});

module.exports = router;

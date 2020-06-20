const express = require('express');
const googleMapsController = require('../controllers/googleMapsController');

const router = express.Router();

router.get('/', googleMapsController.getLatLon, (req, res) => {
  // on success, res.locals.location will contain the Walk Score json blob
  console.log('gmaps router.get /', res.locals.location);
  res.status(res.statusCode).send(res.locals.location);
});

module.exports = router;

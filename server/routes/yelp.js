const express = require('express');
const yelpController = require('../controllers/yelpController');

const router = express.Router();

// Yelp Business Search
//    Returns list of businesses given search parameters
// Required parameters:
//    location: street address
//    latitude: if location not provided
//    longitude: if location not provided
router.get('/business/search', yelpController.businessSearch, (req, res) => {
  // Upon success, res.locals.business will contain an array of businesses
  // returned by the Yelp Business Search API
  console.log('router.get /business/search', res.locals.business);

  // Currently sending the entire blob of data. We should review and consider
  // pruning only to the data we need.
  res.status(200).send(res.locals.business);
});

// Yelp Bussiness Details
//    Returns details about the business given its id
// Required parameters:
//    id: business id
router.get('/business/details', yelpController.businessDetails, (req, res) => {
  // Upon success, res.locals.businessdetails will contain the business details
  // returned by the Yelp Business Details API
  console.log('router.get /business/details', res.locals.businessdetails);

  // Currently sending the entire blob of data. We should review and consider
  // pruning only to the data we need.
  res.status(200).send(res.locals.businessdetails);
});

// Yelp Business Match
//    Returns list of business that match the search criteria
// Required parameters:
//    name: business name
//    address1: street address
//    city: city
//    sate: state
//    country: country
router.get('/business/match', yelpController.businessMatch, (req, res) => {
  // Upon success, res.locals.business will contain a list of businesses
  // returned by the Yelp Business Match API
  console.log('router.get /business/match', res.locals.business);

  // Currently sending the entire blob of data. We should review and consider
  // pruning only to the data we need.
  res.status(200).send(res.locals.business);
});

module.exports = router;

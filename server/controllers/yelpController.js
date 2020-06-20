const fetch = require('node-fetch');
const yelpController = {};

// Yelp Business Search
//    Returns list of businesses given search parameters
// Required parameters:
//    location: street address
//    latitude: if location not provided
//    longitude: if location not provided
// Optional parameters:
//    radius: in meters from given location or lat/lon
//    term: general search term for business name or type of business
//    categories: comma-delimited list of category filters
// API documentation at:
//    https://www.yelp.com/developers/documentation/v3/business_search
yelpController.businessSearch = (req, res, next) => {
  console.log('Invoked yelpController.businessSearch');
  const { latitude, longitude } = req.query;
  const radius = req.query.radius || process.env.YELP_RADIUS;

  const gym = 'gym';
  const categories = '';
  const YELP_API = 'https://api.yelp.com/v3/businesses/search';
  const gymParams = `latitude=${latitude}&longitude=${longitude}&radius=${radius}&term=${gym}&categories=${categories}`;
  const gymURL = `${YELP_API}?${gymParams}`;

  const restaurant = 'restaurant';
  const restaurantParams = `latitude=${latitude}&longitude=${longitude}&radius=${radius}&term=${restaurant}&categories=${categories}`;
  const restaurantURL = `${YELP_API}?${restaurantParams}`;

  const urls = [
    ['gyms', gymURL],
    ['restaurants', restaurantURL],
  ];

  res.locals.business = {};

  // use map() to perform a fetch and handle the response for each url
  Promise.all(
    urls.map(([type, url]) =>
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.YELP_KEY}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          // console.log('URL fetch returned', data);
          res.locals.business[type] = data;
        })
        .catch(error =>
          next({
            message: 'Error in yelpController.businessSearch',
            serverMessage: {
              err: error,
            },
          })
        )
    )
  )
    .then(data => {
      console.log('All data returned', data);
      console.log('res.local', res.locals.business);
      // console.log('Gyms', res.local.gyms);
      // console.log('Restaurants', res.local.restaurants);
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in yelpController.businessSearch',
        serverMessage: {
          err: error,
        },
      })
    );
};

// Yelp Business Details
//    Returns details about the business given its id
// Required parameters:
//    id: business id
// API Documentation:
//    https://www.yelp.com/developers/documentation/v3/business
yelpController.businessDetails = (req, res, next) => {
  console.log('Invoked yelpController.businessDetails');
  const { id } = req.query;
  const YELP_API = 'https://api.yelp.com/v3/businesses/';
  const params = `${id}`;
  const URL = `${YELP_API}${params}`;
  fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      res.locals.businessdetails = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in yelpController.businessDetails',
        serverMessage: {
          err: error,
        },
      })
    );
};

// Yelp Business Match
//    Returns list of businesses given search parameters
// Required parameters:
//    name: business name
//    address1: street address
//    city: city
//    state: state
//    country: country
// API documentation at:
//    https://www.yelp.com/developers/documentation/v3/business_match
yelpController.businessMatch = (req, res, next) => {
  console.log('Invoked yelpController.businessMatch');
  const { name, address1, city, state, country } = req.query;
  const YELP_API = 'https://api.yelp.com/v3/businesses/matches';
  const params = `name=${name}&address1=${address1}&city=${city}&state=${state}&country=${country}`;
  const URL = `${YELP_API}?${params}`;
  fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      res.locals.business = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in yelpController.businessMatch',
        serverMessage: {
          err: error,
        },
      })
    );
};

module.exports = yelpController;

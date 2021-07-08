const fetch = require('node-fetch');
const googleMapsController = {};

// getLatLon will attempt to get the Latitude and Longitude based on
// the address given
// Required parameters:
//    address: user's address
//
// Further infomration on the paramters and response:
// https://developers.google.com/maps/documentation/geocoding/start
googleMapsController.getLatLon = (req, res, next) => {
  console.log('Invoked googleMapsController.getLatLon', req.query);
  const { address } = req.query;
  const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  const params = `address=${address}&key=${process.env.GMAPS_KEY}`;
  const URL = `${API_URL}?${params}`;
  fetch(URL, {
    method: 'GET',
    redirect: 'follow',
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('getLatLon data', data);
      res.locals.location = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in googleMapsController.getLatLon middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

module.exports = googleMapsController;

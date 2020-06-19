const fetch = require('node-fetch');
const iqAirController = {};

// getIqAirScore will fetch the IQ Air Quality for a given location
// Required request parameters:
//    lat: the latitude of the location
//    lon: the longitude of the location
// If lat/lon are not provided, the API will attempt to use
// IP Geolocation to determine location
//
// Further information on other parameters and response:
// https://www.walkscore.com/professional/api.php
iqAirController.getIqAirScore = (req, res, next) => {
  console.log('Invoked iqAirController.getIqAirScore', req.query);
  const { lat, lon } = req.query;
  const API_URL = 'https://api.airvisual.com/v2/nearest_city';
  const params = `key=${process.env.IQAIR_KEY}`;
  const URL = `${API_URL}?${params}&lat=${lat}&lon=${lon}`;
  fetch(URL, {
    method: 'GET',
    redirect: 'follow',
  })
    .then(response => {
      // console.log('response', response.status, response.statusText);
      res.statusCode = response.status;
      res.statusMessage = response.statusText;
      return response.json();
    })
    .then(data => {
      // console.log('iqAirScore data', data);
      // console.log('res', res.statusCode, res.statusMessage);
      res.locals.iqairscore = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in iqAirController.getIqAirScore middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

module.exports = iqAirController;

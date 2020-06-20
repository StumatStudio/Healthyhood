const fetch = require('node-fetch');
const crimeController = {};

// getCrimeData will fetch the Crime Data for a given location
// Required request parameters:
//    lat: the latitude of the location
//    lon: the longitude of the location
//
// Further information on other parameters and response:
// https://www.walkscore.com/professional/api.php
crimeController.getCrimeData = (req, res, next) => {
  console.log('Invoked crimeController.getCrimeData', req.query);
  const { lat, lon } = req.query;
  const distance = '3mi';
  const timeStart = new Date(2020, 1, 1).toJson();
  const timeEnd = Date.now().toJson();
  const API_URL = 'https://api.crimeometer.com/v1/incidents/raw-data';
  const params = `lat=${lat}&lon=${lon}&distance=${distance}&datetime_ini=${timeStart}&datetime_end=${timeEnd}`;
  const URL = `${API_URL}?${params}`;
  fetch(URL, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'x-api-key': process.env.CRIME_KEY,
    },
  })
    .then(response => {
      // console.log('response', response.status, response.statusText);
      res.statusCode = response.status;
      res.statusMessage = response.statusText;
      return response.json();
    })
    .then(data => {
      // console.log('crime data', data);
      // console.log('res', res.statusCode, res.statusMessage);
      res.locals.crimedata = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in crimeController.getCrimeData middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

// getCrimeStats will fetch the Crime Data for a given location
// Required request parameters:
//    lat: the latitude of the location
//    lon: the longitude of the location
//
// Further information on other parameters and response:
// https://www.walkscore.com/professional/api.php
crimeController.getCrimeStats = (req, res, next) => {
  console.log('Invoked crimeController.getCrimeStats', req.query);
  const { lat, lon } = req.query;
  const distance = '3mi';
  const timeStart = new Date(2020, 1, 1).toJson();
  const timeEnd = Date.now().toJson();
  const API_URL = 'https://api.crimeometer.com/v1/incidents/stats';
  const params = `lat=${lat}&lon=${lon}&distance=${distance}&datetime_ini=${timeStart}&datetime_end=${timeEnd}`;
  const URL = `${API_URL}?${params}`;
  fetch(URL, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'x-api-key': process.env.CRIME_KEY,
    },
  })
    .then(response => {
      // console.log('response', response.status, response.statusText);
      res.statusCode = response.status;
      res.statusMessage = response.statusText;
      return response.json();
    })
    .then(data => {
      // console.log('crime stats', data);
      // console.log('res', res.statusCode, res.statusMessage);
      res.locals.crimestats = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in crimeController.getCrimeStats middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

module.exports = crimeController;

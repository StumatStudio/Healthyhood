const fetch = require('node-fetch');
const walkScoreController = {};

// getWalkScore will fetch the Walk Score for a given location
// Required request parameters:
//    lat: the latitude of the location
//    lon: the longitude of the location
//    address: URL encoded address (seems to work without this)
// Further information on other parameters and response:
// https://www.walkscore.com/professional/api.php
walkScoreController.getWalkScore = (req, res, next) => {
  console.log('Invoked walkScoreController.getWalkScore', req.query);
  const { lat, lon, address } = req.query;
  const API_URL = 'https://api.walkscore.com/score';
  const params = `format=json&transit=1&bike=1&wsapikey=${process.env.WALKSCORE_KEY}`;
  const URL = `${API_URL}?${params}&lat=${lat}&lon=${lon}&address=${address}`;
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
      // console.log('walkScore data', data);
      // console.log('res', res.statusCode, res.statusMessage);
      res.locals.walkscore = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in walkScoreController.getWalkScore middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

module.exports = walkScoreController;

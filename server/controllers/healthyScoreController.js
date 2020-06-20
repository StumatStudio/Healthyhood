const healthyScoreController = {};

// Calculate the Healthyhood Score
//    Returns a single value representing the Healthyhood Score
// Required parameters:
//    walkscore
//    yelpgyms
//    yelprestaurants
//    iqair
//
// Will need to normalize some scores for the algorithm, since
// iqair is in the range 0-500 and lower is better vs other
// scores where higher is better
healthyScoreController.calcHealthyScore = (req, res, next) => {
  console.log('Invoked healthyScoreController.calcHealthyScore', req.query);
  const { walkscore, yelpgyms, yelprestaurants, iqairscore } = req.query;
  const healthyscore = Math.floor(
    0.4 * walkscore +
      0.3 * Math.min(1, yelpgyms / yelprestaurants) * 100 +
      0.3 * iqairscore
  );
  res.locals.healthyscore = JSON.stringify(healthyscore);
  return next();
};

module.exports = healthyScoreController;

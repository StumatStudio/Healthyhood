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
  const walkscore = Number(req.query.walkscore) || 0;
  const restaurants = Number(req.query.yelprestaurants) || 1;
  const gyms = Number(req.query.yelpgyms) || 0;
  const airscore = Number(req.query.iqairscore) || 0;
  console.log('new walkscore', walkscore);
  const healthyscore = Math.floor(
    0.4 * walkscore +
      0.3 * Math.min(1, gyms / restaurants) * 100 +
      0.3 * (1 - airscore / 500) * 100
  );
  res.locals.healthyscore = JSON.stringify(healthyscore);
  return next();
};

module.exports = healthyScoreController;

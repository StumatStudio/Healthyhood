const cors = require('cors');

/*
This module returns a function that when called adds options
to the App object which will mitigate cors rejections in browsers
*/
module.exports = function (app) {
  const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
  };
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
};

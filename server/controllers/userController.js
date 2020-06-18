const bcrypt = require('bcryptjs');
const models = require('../models/userModel');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into
 * res.locals.users before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  console.log('Invoked userController.getAllUsers');
  models.Users.find({})
    .exec()
    .then(data => {
      res.locals.users = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in userController.getAllUsers middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  console.log('Invoked userController.createUser');
  const { password, username, email } = req.body;

  if (
    typeof req.body.username !== 'string' ||
    typeof req.body.email !== 'string' ||
    typeof req.body.password !== 'string' ||
    username === undefined ||
    email === undefined ||
    password === undefined
  )
    return next({
      message: 'Error in userController.createUser middleware',
      status: 400,
      serverMessage: {
        err: 'Bad Request',
      },
    });

  models.Users.create(req.body)
    .then(data => {
      res.locals.user = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in userController.createUser middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted
 * password against the password stored in the database.
 */
userController.verifyUser = async (req, res, next) => {
  console.log('Invoked userController.verifyUser');
  const { password, username } = req.body;

  if (
    typeof req.body.username !== 'string' ||
    typeof req.body.password !== 'string' ||
    username === undefined ||
    password === undefined
  )
    return next({
      message: 'Error in userController.verifyUser middleware',
      status: 400,
      serverMessage: {
        err: 'Bad Request',
      },
    });

  const users = await models.Users.find({ username });
  if (users.length === 0)
    return next({
      message: 'Error in userController.verifyUser middleware',
      status: 401,
      serverMessage: {
        err: 'Invalid username',
      },
    });

  const isMatch = await bcrypt.compare(password, users[0].password);
  if (isMatch) {
    res.locals.user = users[0];
    return next();
  } else {
    return next({
      message: 'Error in userController.verifyUser middleware',
      status: 401,
      serverMessage: {
        err: 'Invalid password',
      },
    });
  }
};

module.exports = userController;

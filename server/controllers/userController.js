const bcrypt = require('bcryptjs');
const models = require('../models/userModel');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into
 * res.locals.users before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  console.log('Invoked userController.getAllUsers');
  try {
    models.Users.find({}, (err, users) => {
      // if a database error occurs, call next with the error message passed in
      // for the express global error handler to catch
      if (err)
        return next(
          `Error in userController.getAllUsers: ${JSON.stringify(err)}`
        );

      // store retrieved users into res.locals and move on to next middleware
      res.locals.users = users;
      return next();
    });
  } catch (e) {
    console.log('userController.getAllUsers caught error', e);
  }
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  if (
    typeof req.body.username === 'string' &&
    typeof req.body.password === 'string'
  ) {
    // create a query to the db to create a new user
    models.Users.create(req.body)
      .then(data => {
        res.locals.id = data.id;
        return next();
      })
      .catch(error => {
        res.locals.error = error;
        return next();
      });
  } else {
    res.locals.error = {
      errmsg:
        'Error in userController.createUser: invalid credentials in request body',
    };
    return next();
  }
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted
 * password against the password stored in the database.
 */
userController.verifyUser = async (req, res, next) => {
  console.log('Invoked userController.verifyUser');
  try {
    const { password, username } = req.body;

    const users = await models.Users.find({ username });

    if (users.length === 0) {
      res.locals.error = { errmsg: 'invalid username' };
      return next();
    }

    const isMatch = await bcrypt.compare(password, users[0].password);

    if (isMatch) {
      res.locals.id = users[0].id;
    } else {
      res.locals.error = { errmsg: 'invalid password' };
    }

    return next();
  } catch (e) {
    console.log('userController.verifyUser caught error', e);
  }
};

module.exports = userController;

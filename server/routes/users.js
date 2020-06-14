const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// We can double check the actual db itself in Atlas or Mongo CLI,
// so may not need this function, but it can be used to test that
// the server can talk to the user database correctly and see the
// list of users returned by the DB
router.get('/', userController.getAllUsers, (req, res) => {
  // userController.getAllUsers is expected to return the list of users
  // in res.local.users
  // If there is an error, the express global error handler will catch it
  console.log('router.get / ', res.locals.users);
  res.sendStatus(200);
});

router.post('/login', userController.verifyUser, (req, res) => {
  // userController.verifyUser is expected to return the error message
  // in res.locals.error if the credentials are invalid
  // it will have an error if the username or password does not match
  if (res.locals.error) {
    console.log('router.post /login error', res.locals.error.errmsg);
    // HTTP Status 401 = Unauthorized
    res.sendStatus(401);
  } else {
    res.sendStatus(200);
  }
});

router.post('/signup', userController.createUser, (req, res) => {
  // userController.createUser is expected to return the error message
  // in res.locals.error if the request body is invalid
  // otherwise it will create the user and return the user id in
  // res.locals.id
  if (res.locals.error) {
    console.log('router.post /signup error', res.locals.error.errmsg);
    // HTTP Status 400 = Bad Request
    res.sendStatus(400);
  } else {
    console.log('router.post /signup user id', res.locals.id);
    res.sendStatus(200);
  }
});

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// We can double check the actual db itself in Atlas or Mongo CLI,
// so may not need this function, but it can be used to test that
// the server can talk to the user database correctly and see the
// list of users returned by the DB
router.get('/', userController.getAllUsers, (req, res) => {
  // on success, res.locals.users will contain the list of users
  // retrieved from the DB
  console.log('router.get / users', res.locals.users);
  res.sendStatus(200);
});

router.post('/login', userController.verifyUser, (req, res) => {
  // on success, res.locals.user will contain the logged-in user
  console.log('router.post /login user', res.locals.user);
  res.sendStatus(200);
});

router.post('/signup', userController.createUser, (req, res) => {
  // on success, res.locals.user will contain the newly created user
  console.log('router.post /signup user', res.locals.user);
  res.sendStatus(200);
});

module.exports = router;

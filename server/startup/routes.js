const express = require('express');
const path = require('path');

const users = require('../routes/users');
const walkScore = require('../routes/walkScore');
const yelp = require('../routes/yelp');
const iqAir = require('../routes/iqAir');
const crime = require('../routes/crime');
const healthyScore = require('../routes/healthyScore');

const baseUrl = process.env.BASE_URL;

/* 
This module retuns a function that, when called attaches
all of the routes within to the app object passed in
*/

module.exports = app => {
  // Traditional Routes
  app.use(`${baseUrl}/users`, users);
  app.use(`${baseUrl}/walkscore`, walkScore);
  app.use(`${baseUrl}/yelp`, yelp);
  app.use(`${baseUrl}/iqair`, iqAir);
  app.use(`${baseUrl}/healthyscore`, healthyScore);
  app.use(`${baseUrl}/crime`, crime);

  // app.get(`${baseUrl}/nope`, (req, res) => {
  //   res.status(200).json({ message: 'YOU DID IT!!' });
  // });

  // Static files
  if (process.env.NODE_ENV !== 'development') {
    app.use('/dist', express.static(path.join(__dirname, '../../dist')));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
  }

  // Catch all
  app.use('*', (req, res) => res.sendStatus(404));
};

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const errorMiddle = require('../server/middleware/errorHandling');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Startup files
require('./startup/logging')();
require('./startup/database')();
require('./startup/cors')(app);
require('./startup/routes')(app);

// Global express error handler
app.use(errorMiddle);

// Listens on port 3000 -> http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;

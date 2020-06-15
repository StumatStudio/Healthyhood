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
require('./startup/cors')(app);
require('./startup/routes')(app);

// Set up and connect to the Mongo DB
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'healthyhood',
  })
  .then(() => console.log('Connected to Mongo DB: healthyhood'))
  .catch(err => console.log(`Error occurred in mongoose.connect: ${err}`));

// Global express error handler
app.use(errorMiddle);

// Listens on port 3000 -> http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;

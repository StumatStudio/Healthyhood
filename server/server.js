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

// Resolves warning message:
// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
//
// By default, Mongoose 5.x calls the MongoDB driver's ensureIndex() function.
// The MongoDB driver deprecated this function in favor of createIndex().
// Set the useCreateIndex global option to opt in to making Mongoose use createIndex() instead.
mongoose.set('useCreateIndex', true);

// Set up and connect to the Mongo DB
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

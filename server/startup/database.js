const mongoose = require('mongoose');

module.exports = () => {
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
    .then(() => console.log('Connected to Mongo DB: UrbanSherpa'))
    .catch(err => console.log(`Error occurred in mongoose.connect: ${err}`));
};

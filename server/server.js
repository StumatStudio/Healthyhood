const express = require('express');
require('dotenv').config();

const errorMiddle = require('../server/middleware/errorHandling');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Startup files
require('./startup/logging');
require('./startup/cors')(app);
require('./startup/routes')(app);

app.use(errorMiddle);
// listens on port 3000 -> http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
module.exports = app;

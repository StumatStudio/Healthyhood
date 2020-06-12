// Boilerplate test

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// route handlers
// serve the static files and main app
// if (process.env.NODE_ENV === 'production'
//   || process.env.NODE_ENV === 'development') {
// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
// }
// default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
// listens on port 3000 -> http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
module.exports = app;

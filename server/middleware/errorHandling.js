module.exports = (err, req, res, next) => {
  const defaultErrObj = {
    message: 'Unknown Server Error. Please see server logs for details',
    status: 500,
    serverMessage: err,
  };
  const errObj = Object.assign(defaultErrObj, err);
  console.log('Unknown middleware error:', errObj);

  res.status(errObj.status).json(errObj.message);
};

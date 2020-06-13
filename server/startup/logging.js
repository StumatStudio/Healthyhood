/*
This module retuns a function that, when called, adds error handling
for erros that occur outside of our route chain (for instance in the 
  server.js file). 

Also, in the future, should we want to add a loggig service to log
requests / responses / errors etc. This can be accomplished here.
*/

module.exports = () => {
  process.on('uncaughtException', (ex) => {
    console.log('UNCAUGHT EXCEPTION PRCOESS:');
    console.log(ex.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    console.log('UNHANDLED PROMISE REJECTION:');
    console.log(ex.message);
    // console.log(ex);
    process.exit(1);
  })
}
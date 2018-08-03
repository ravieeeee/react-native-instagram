const express = require('express');
const router = express.Router();
const createError = require('http-errors');


module.exports = (app) => {
  app.use((req, res, next) => {
    console.log(req.headers);
    next();
  });
  
  router.post('/oauth/token', app.oauth.token());
  router.use('/users', require('./users')(app));

  // catch 404 and forward to error handler
  router.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  router.use((err, req, res, next) => {
    const error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ code: 999, msg: err.message, eror: error });
  });
  return router;
};

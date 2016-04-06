'use strict';

var router = require('express').Router();
var session = require('express-session');

var min = 1;

router.use(session({
  secret: 'toolongiscool',
  cookie: {
    maxAge: min * 60000
  }
}));

router.use(function(req, res, next) {

  console.log('session', req.session);
  // if (!req.session.counter) {
  //   req.session.counter = 0;
  // }
  // console.log('counter', ++req.session.counter);
  next();
});
module.exports = router;

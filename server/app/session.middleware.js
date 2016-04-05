'use strict';

var router = require('express').Router();
var session = require('express-session');

router.use(session({
  secret: 'toolongiscool'
}));

router.use(function(req, res, next) {
  console.log('session', req.session);
  next();
});

router.use(function(req, res, next) {
  if (!req.session.counter) {
    req.session.counter = 0;
  }
  console.log('counter', ++req.session.counter);
  next();
});

module.exports = router;

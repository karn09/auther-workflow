'use strict';

var router = require('express').Router(),
  _ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');

router.param('id', function(req, res, next, id) {
  User.findById(id).exec()
    .then(function(user) {
      if (!user) throw HttpError(404);
      req.requestedUser = user;
      next();
    })
    .then(null, next);
});

router.get('/', function(req, res, next) {
  User.find({}).exec()
    .then(function(users) {
      res.json(users);
    })
    .then(null, next);
});

router.post('/', function(req, res, next) {
  User.create(req.body)
    .then(function(user) {
      res.status(201).json(user);
    })
    .then(null, next);
});

router.post('/login', function(req, res, next) {
  User.findOne({
      email: req.body.email,
      password: req.body.password
    }).exec()
    .then(function(user) {
      if (!user) {
        res.sendStatus(401);
      } else {
        req.session.userId = user._id;
        res.sendStatus(200);
      }
    })
    .then(null, next);
});

router.post('/signup', function(req, res, next) {
  User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(function(user) {
      if (!user) {
        res.sendStatus(401);
      } else {
        res.json(user);
      }
    });
});

router.post('/logout', function(req, res, next) {
  if (req.session.userId) {
    req.session.userId = null;
    res.sendStatus(200);
  } else {
    res.sendStatus(201);
  }
});

router.get('/:id', function(req, res, next) {
  req.requestedUser.getStories()
    .then(function(stories) {
      var obj = req.requestedUser.toObject();
      obj.stories = stories;
      res.json(obj);
    })
    .then(null, next);
});

router.put('/:id', function(req, res, next) {
  _.extend(req.requestedUser, req.body);
  req.requestedUser.save()
    .then(function(user) {
      res.json(user);
    })
    .then(null, next);
});

router.delete('/:id', function(req, res, next) {
  req.requestedUser.remove()
    .then(function() {
      res.status(204).end();
    })
    .then(null, next);
});

module.exports = router;

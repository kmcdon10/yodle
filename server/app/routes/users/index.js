'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var Review = mongoose.model('Review');
// var deepPopulate = require('mongoose-deep-populate')(mongoose);
var _ = require('lodash');
module.exports = router;

router.param('id', (req, res, next, id) => {
  User.findById(id).then(user => {
      req.user = user;
      next();
    })
    .then(null, next);
});

router.param('id', (req, res, next, id) => {
  User.findById(id).exec()
    .then(user => {
      req.foundUser = user;
      next();
    })
    .then(null, next);
});

router.get('/', (req, res, next) => {
  //included req.query for filtering users
  User.find(req.query).exec()
    .then(results => res.send(results))
    .then(null, next);
});

router.get('/:id', (req, res) => {
  res.send(req.foundUser);
});

router.put('/:id', (req, res, next) => {
  Object.keys(req.body).forEach(key => {
    req.foundUser[key] = req.body[key];
  });
  return req.foundUser.save()
  .then(user => res.send(user))
  .then(null, next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.status(200).json(user))
  .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  req.foundUser.remove()
    .then(user => res.sendStatus(410))
    .then(null, next);
});

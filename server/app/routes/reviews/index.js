'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Review = mongoose.model('Review');
var _ = require('lodash');

router.param('id', (req, res, next, id) => {
  Review.findById(id).then(review => {
      req.review = review;
      next();
    })
    .then(null, next);
});

router.get('/', (req, res, next) => {
  Review.find(req.query)
  .then(reviews => res.send(reviews))
  .then(null, next);
});

router.get('/:id', (req, res, next) => res.send(req.review));

router.put('/:id', (req, res, next) => {
  Object.keys(req.body).forEach(key => {
    req.review[key] = req.body[key];
  });
  return req.review.save()
  .then(review => res.send(review))
  .then(null, next);
});

router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => res.send(review))
  .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  req.review.remove().then(review => {
    res.send(review);
  }).then(null, next);
});

module.exports = router;

// Instantiate all models
require('../../../server/db/models');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Review = mongoose.model('Review');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var supertest = require('supertest');
var app = require('../../../server/app');

describe('Review Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('/reviews', function () {

		var userAgent;
    var reviewInfo;
    var currentReview;

		beforeEach('Create user agent', function (done) {
			userAgent = supertest.agent(app);
      done();
		});

    beforeEach('Create review', function(done) {
      reviewInfo = {title: 'Best Restaurant Ever!', description: "Food is amazing", rating: 5};
      Review.create(reviewInfo)
      .then(function(review) {
        currentReview = review;
        done();
      });
    });

    describe('get all reviews', function() {
			it('should get a 200 response and return an array of reviews', function (done) {
				userAgent.get('/api/reviews/')
					.expect(200).end(function(err, response) {
            if(err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body[0]._id).to.equal(currentReview._id.toString());
            done();
          });
			});
    });

    describe('posts review route', function() {
      it('should return a review', function(done) {
        userAgent.post('/api/reviews').send({title: 'Dont go here', description: 'worst place ever', rating: 2})
        .end(function(err, response) {
            if(err) return done(err);
            expect(response.body.title).to.be.equal('Dont go here');
            done();
          });
      });
    });

    describe('users put route', function() {
      it('should update a review', function(done) {
        userAgent.put('/api/reviews/' + currentReview._id).send({description: 'nice people, terrible food'})
        .end(function(err, response) {
            if(err) return done(err);
            console.log("\n\n\nresponse body ", response.body);
            expect(response.body.description).to.be.equal('nice people, terrible food');
            done();
          });
      });
    });
  });
});

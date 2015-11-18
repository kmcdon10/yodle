// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('/users', function () {

		var userAgent;
    var currentUser;
    var userInfo;

    beforeEach('Create User', function(done) {
      userInfo = {
				username: 'potus',
        email: 'barack@aol.com',
        password:'Michelle',
      };
      
      User.create(userInfo)
      .then(function(user) {
        currentUser = user;
        done();
      });
    });

		beforeEach('Create user agent', function (done) {
			userAgent = supertest.agent(app);
      done();
		});

    describe('users get route', function() {
			it('should get a 200 response and return an array of users', function (done) {
				userAgent.get('/api/users/')
					.expect(200).end(function(err, response) {
            if(err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body[0]._id).to.equal(currentUser._id.toString());
            done();
          });
			});
    });

    describe('users post route', function() {
      it('should return a user', function(done) {
        userAgent.post('/api/users').send({username: 'becks', email: 'becks@isTheBest.com', password: 'gandalf'})
        .end(function(err, response) {
            if(err) return done(err);
            expect(response.body.email).to.be.equal('becks@isTheBest.com');
            done();
          });
      });
    });

    describe('users put route', function() {
      it('should update a user', function(done) {
        userAgent.put('/api/users/' + currentUser._id).send({email: 'obizzle@gmail.com'})
        .end(function(err, response) {
            if(err) return done(err);
            expect(response.body.email).to.be.equal('obizzle@gmail.com');
            done();
          });
      });
    });
	});
});



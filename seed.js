/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

var tempData = {};

function seedUsers(reviews) {

    var users = [
        {
            username: "testing",
            email: 'testing@yodle.com',
            password: 'password',
            review: reviews[Math.floor(Math.random() * reviews.length)]._id,
        },
        {
            username: "potus44",
            email: 'obama@gmail.com',
            password: 'potus',
            review: reviews[Math.floor(Math.random() * reviews.length)]._id,
        }
    ];

    return User.createAsync(users);
}

function seedReviews() {
    var reviews = [
    {
        rating: 5,
        title: "Best Restaurant Ever!",
        description: "Food is amazing. Staff is very friendly",
    },
    {
        rating: 4,
        title: "Pretty good food",
        description: "Nice atmosphere. I loves the service and best of all, the food was DELICIOUS!",
    },
    {
        rating: 2,
        title: "Dont go here",
        description: "Turrible! Just Turrible!",
    },
    {
        rating: 3.5,
        title: "Not a bad expierence!",
        description: "Food is amazing. Staff is friendly",
    }];

    return Review.createAsync(reviews);
}

connectToDb.then(function () {
    Review.findAsync({}).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function (reviews) {
        tempData.reviews = reviews;
        return seedUsers(tempData.reviews);
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

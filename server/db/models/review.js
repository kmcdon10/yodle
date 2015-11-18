'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

mongoose.model('Review', schema);
'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var crypto = require('crypto');
var Review = require('./review');
// var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    reviews: [{
        type: ObjectId,
        ref:"Review"
    }],
    password: {
        type: String,
        required: true,
    },
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.

var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

schema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }
  if (this.experience > 100) {
    this.level += 1;
    this.experience = 0;
  }
  next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
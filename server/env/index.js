var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');

module.exports = require(devConfigPath);

'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));

// Keep this after all the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

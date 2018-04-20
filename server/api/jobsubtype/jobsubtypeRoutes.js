var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./jobsubtypeController');

router.route('/')
    .get(controller.get)
    .post(controller.post);

module.exports = router;
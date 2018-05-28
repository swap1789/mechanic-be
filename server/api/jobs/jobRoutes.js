var router = require('express').Router();
var controller = require('./jobController');
var auth = require('../../auth/auth');
var checkMechanic = [auth.decodeToken(), auth.getFreshMechanic()];

router.route('/')
    .get(checkMechanic, controller.get)
    .post(checkMechanic, controller.post);

module.exports =  router;

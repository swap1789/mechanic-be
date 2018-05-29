var router = require('express').Router();
var controller = require('./jobController');
var auth = require('../../auth/auth');
var checkMechanic = [auth.decodeToken(), auth.getFreshMechanic()];

router.param('id', controller.params);
router.route('/:id')
    .get(checkMechanic, controller.get)
    .post(checkMechanic, controller.post);

router.route('/').post(controller.post);

module.exports =  router;

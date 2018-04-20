var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./mechanicController');
var auth = require('../../auth/auth');
var checkMechanic = [auth.decodeToken(), auth.getFreshMechanic()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);
router.get('/me', checkMechanic, controller.me);

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(checkMechanic, controller.put)
  .delete(checkMechanic, controller.delete)

module.exports = router;
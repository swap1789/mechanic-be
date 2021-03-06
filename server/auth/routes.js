var router = require('express').Router();
var verifyMechanic = require('./auth').verifyMechanic;
var controller = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyMechanic(), controller.signin);

module.exports = router;
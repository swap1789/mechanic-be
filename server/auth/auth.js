var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var Mechanic = require('../api/mechanic/mechanicModel');
var logger = require('../util/logger');

exports.decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.mechanic
    checkToken(req, res, next);
  };
};

exports.getFreshMechanic = function() {
  return function(req, res, next) {
    Mechanic.findById(req.mechanic._id)
      .then(function(mechanic) {
        if (!mechanic) {
          // if no mechanic is found it was not
          // it was a valid JWT but didn't decode
          // to a real mechanic in our DB. Either the mechanic was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send('Unauthorized');
        } else {
          // update req.mechanic with fresh mechanic from
          // stale token data
          req.mechanic = mechanic;
          next();
        }
      }, function(err) {
        next(err);
      });
  }
};

exports.verifyMechanic = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    logger.log(password);
    // if no mechanicname or password then send
    if (!username || !password) {
      res.status(400).send('You need a mechanicname and password');
      return;
    }

    // look mechanic up in the DB so we can check
    // if the passwords match for the mechanicname
    Mechanic.findOne({username: username})
      .then(function(mechanic) {
        if (!mechanic) {
          res.status(401).send('No mechanic with the given mechanicname');
        } else {
          // checking the passowords here
          if (!mechanic.authenticate(password)) {
            res.status(401).send('Wrong password');
          } else {
            // if everything is good,
            // then attach to req.mechanic
            // and call next so the controller
            // can sign a token from the req.mechanic._id
            req.mechanic = mechanic;
            next();
          }
        }
      }, function(err) {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  );
};
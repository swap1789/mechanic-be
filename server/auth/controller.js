var Mechanic = require('../api/mechanic/mechanicModel');
var signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.mechanic._id);
  res.json({token: token, name: req.mechanic.username, id:req.mechanic._id});
};

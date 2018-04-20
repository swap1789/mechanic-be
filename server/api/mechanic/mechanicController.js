var Mechanic = require('./mechanicModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;


exports.params = function(req, res, next, id) {
    Mechanic.findById(id)
        .select('-password')
        .exec()
        .then(function(mechanic) {
            if(!mechanic) {
                next(new Error('No mechanic with that Id'));
            } else {
                req.mechanic = mechanic;
                next();
            }
        }, function(err) {
            next(err);
        });
}

exports.get = function(req, res, next) {
    Mechanic.find({})
      .select('-password')
      .exec()
      .then(function(mechanics){
        res.json(mechanics.map(function(mechanic){
          return mechanic.toJson();
        }));
      }, function(err){
        next(err);
      });
  };
  
  exports.getOne = function(req, res, next) {
    var mechanic = req.mechanic.toJson();
    res.json(mechanic.toJson());
  };
  
  exports.put = function(req, res, next) {
    var mechanic = req.mechanic;
  
    var update = req.body;
  
    _.merge(mechanic, update);
  
    mechanic.save(function(err, saved) {
      if (err) {
        next(err);
      } else {
        res.json(saved.toJson());
      }
    })
  };
  
  exports.post = function(req, res, next) {
    var newmechanic = new Mechanic(req.body);
  
    newmechanic.save(function(err, mechanic) {
      if(err) { return next(err);}
  
      var token = signToken(mechanic._id);
      res.json({token: token});
    });
  };
  
  exports.delete = function(req, res, next) {
    req.mechanic.remove(function(err, removed) {
      if (err) {
        next(err);
      } else {
        res.json(removed.toJson());
      }
    });
  };
  
  exports.me = function(req, res) {
    res.json(req.mechanic.toJson());
  };

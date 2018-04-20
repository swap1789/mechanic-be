var JobSubType = require('./jobsubtypeModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, id, next) {
    JobSubType.findById(id).
    then( function(subtype) {
        if(!subtype) {
            next(new Error('No job subtype with that id'));
        } else {
            req.jobsubtype = subtype;
            next();
        }
    }, function(err) {
        next(err);
    })
}

exports.post = function(req, res, next) {
    var newjobsubtype = new JobSubType(req.body);
    JobSubType.create(newjobsubtype)
        .then(function(subtype){
            res.json(subtype)
        }, function(err){
            logger.error(err);
            next(err);
        });
}

exports.get = function() {

}

exports.put = function() {

}

exports.delete = function() {
    
}
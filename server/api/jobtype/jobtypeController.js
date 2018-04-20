var JobType = require('./jobtypeModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.post = function(req, res, next) {
    var newjobtype = new JobType(req.body);
    console.log(req.body)
    JobType.create(newjobtype)
        .then(function(jobtype){
            res.json(jobtype)
        }, function(err){
            logger.error(err);
            next(err);
        });
};


exports.get = function(req, res, next) {
		JobType.find({})
		.populate('subTypes')
    .exec()
    .then(function(jobtypes){
        res.json(jobtypes.map(function(jobtype){
          return jobtype.toJson();
        }));
    }, function(err) {
        next(err);
    })
}
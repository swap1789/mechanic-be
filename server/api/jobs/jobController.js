var Job = require("./jobModel");
var _ = require("lodash");
var logger = require("../../util/logger");

exports.params = function(req, res, next, id) {
  Job.findById(id)
    .populate("assignedTo jobtype")
    .exec()
    .then(
      function(job) {
        if (!job) {
          next(new Error("No Job with that Id"));
        } else {
          req.job = job;
          next();
        }
      },
      function(err) {
        next(err);
      }
    );
};

exports.post = function(req, res, next) {
  var newJob = new Job(req.body);

  // newJob.assignedTo = req.mechanic._id;  ToDo : decode user token to get the user id who has logged in
  Job.create(newJob).then(
    function(job) {
      res.json(job);
    },
    function(err) {
      logger.error(err);
      next(err);
    }
  );
};

/**
 * Get the job details of the mecahnic - job details includes jobtypes and jobsubtypes as well
 */
exports.get = function(req, res, next) {
	Job.find({})
		.populate('assignedTo', 'username')
		.populate({
			path: 'jobType',
			populate : { path: 'subTypes' }
		})
	  .exec()
    .then(
      function(jobs) {
        res.json(
          jobs.map(function(job) {
            return job.toJson();
          })
        );
      },
      function(err) {
        next(err);
      }
    );
};

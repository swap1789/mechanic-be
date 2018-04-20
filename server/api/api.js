var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/mechanics', require('./mechanic/mechanicRoutes'));
router.use('/subtypes', require('./jobsubtype/jobsubtypeRoutes'));
router.use('/jobtypes', require('./jobtype/jobtypeRoutes'));
router.use('/jobs', require('./jobs/jobRoutes'));

module.exports = router;
const router = require('express').Router();
const homepageroutes = require('./homepage-routes');
const apiroutes = require('./api/api-routes');

router.use('/api', apiroutes);
router.use('/', homepageroutes);

module.exports = router;
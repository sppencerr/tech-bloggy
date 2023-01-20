const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/apiRoutes');

router.use('/api', api-routes);
router.use('/', homepage-routes);

module.exports = router;
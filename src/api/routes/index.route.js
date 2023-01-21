const router = require('express').Router();
const weatherRoutes = require('./weather.route');

router.use('/weathers', weatherRoutes);

module.exports = router;

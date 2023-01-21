const express = require('express');
const router = express.Router();
const { weatherController } = require('../controllers');
const validate = require('../middleware/validate');
const { weatherValidation } = require('../validations');

/**
 * @swagger
 *  /weathers/cities:
 *   get:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Authorization
 *       in: header
 *     - name: type
 *       in: query
 *     - name: city
 *       in: query
 *     - name: limit
 *       in: query
 *     - name: page
 *       in: query
 *       description: Get All City Listing
 *     responses:
 *       200:
 *         description: Return Message
 */
router.get(
	'/cities',
	validate(weatherValidation.cityQuery),
	weatherController.getCities
);

module.exports = router;

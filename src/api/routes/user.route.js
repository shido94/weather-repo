const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const validate = require('../middleware/validate');
const { userValidation } = require('../validations');

/**
 * @swagger
 *  /users/:
 *   get:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Authorization
 *       in: header
 *     - name: search
 *       in: query
 *     - name: companyName
 *       in: query
 *     - name: fullAddress
 *       in: query
 *     - name: approvalStatus
 *       in: query
 *     - name: sortBy
 *       in: query
 *     - name: page
 *       in: query
 *       description: Get All Brokers Listing
 *     responses:
 *       200:
 *         description: Return Message
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 *  /users/verify-otp:
 *   post:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         type: object
 *         required:
 *           - otp
 *           - type
 *         properties:
 *           otp:
 *             type: number
 *           type:
 *             type: string
 *     responses:
 *       200:
 *         description: Return Message
 */
router.post(
	'/verify-otp',
	validate(userValidation.verifyVerificationOtp),
	userController.createUser
);

module.exports = router;

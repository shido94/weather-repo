const httpStatus = require('http-status');
const {
	pick,
	apiError,
	catchAsync,
	responseHandler,
	responseMessage,
} = require('../utils');

const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
	const filter = pick(req.query, ['name', 'role']);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const result = await userService.queryUsers(filter, options);
	res.send(result);
});

const sendEmailVerificationOTP = catchAsync(async (req, res) => {
	const { sub } = req.user;
	await userService.checkIfEmailNotLinkedWithOthers(sub, req.params.email);
	const user = await userService.checkIfUserExist(sub);

	if (user && user.isEmailVerified) {
		logger.error('User email is already verified => ', user.email);
		throw new apiError(httpStatus.CONFLICT, 'Email is already verified');
	}

	logger.info('Valid User');
	await userService.updateUserEmail(sub, req.params.email);
	logger.info('Update User Email');

	await userService.sendEmailVerificationOtp(sub, req.params.email);
	logger.info('Otp has been sent successfully to email');

	return responseHandler.sendSuccess(
		res,
		httpStatus.OK,
		{},
		responseMessage.OTP_SEND_EMAIL
	);
});

module.exports = {
	createUser,
	getUsers,
	sendEmailVerificationOTP,
};

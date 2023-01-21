const httpStatus = require('http-status');
const { pick, catchAsync, responseMessage } = require('../utils');
const { weatherService } = require('../services');
const { responseHandler } = require('../handlers');

const getCities = catchAsync(async (req, res) => {
	const filter = pick(req.query, ['type', 'city']);
	const options = pick(req.query, ['limit', 'page']);

	const cities = await weatherService.getCities(filter);
	logger.info('Cities fetched');

	const final = responseHandler.checkNextHit(cities, options.limit);

	return responseHandler.sendSuccess(
		res,
		httpStatus.OK,
		final,
		responseMessage.OTP_SEND_EMAIL
	);
});

module.exports = {
	getCities,
};

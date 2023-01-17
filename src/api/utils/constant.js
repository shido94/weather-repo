const config = require('../config/environment');

module.exports = {
	URI: {
		BROKER_API_URI: `${config.API_URI}`,
	},

	CONFIG: {
		PORT: config.PORT,
	},
};

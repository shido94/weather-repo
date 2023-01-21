const config = require('../config/environment');

module.exports = {
	PORT: config.PORT,
	API_URI: config.API_URI,
	WEATHER_API_KEY: config.WEATHER_API_KEY,
	WEATHER_URI: config.WEATHER_URI,
	FORECAST_URI: config.FORECASTS_URI,
};

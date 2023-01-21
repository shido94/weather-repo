const http = require('http');
const { axiosHandler } = require('../handlers');
const request = require('request');
const { constant } = require('../utils');
console.log(constant.WEATHER_API_KEY);
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getWeatherData = (locations, type) =>
	Promise.all(
		locations.map(
			(value) =>
				new Promise((resolve, reject) => {
					const query = `${type}=${value}`;
					const url = `${constant.WEATHER_URI}/weather?${query}&appid=${constant.WEATHER_API_KEY}`;
					return request.get(url, (err, data) => {
						if (err) return reject(err);
						return resolve(JSON.parse(data.body));
					});
				})
		)
	);

const getCities = async (filter) => {
	try {
		const cities = filter.city.split(',');
		if (filter.type === 'code') {
			filter.type = 'id';
		} else {
			filter.type = 'q';
		}
		const response = await getWeatherData(cities, filter.type);
		return response;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getCities,
};

import request from '@/api/request';
import utils from '@/api/utils';

/**
 * Gets the current weather by location.
 * @param {string} city
 * @return {!Promise<!WeatherModel>}
 */
const getWeatherByCity = (city) => {
	const params = {
		units: 'metric',
		q: city,
	};
	return request.get('weather', { params })
				  .then((response) => utils.convertDataToWeatherModel(response.data))
				  .catch((error) => error);
};

/**
 * Gets the current weather by geo coords.
 * @param {!CoordsModel} coords
 * @return {!Promise<!WeatherModel>}
 */
const getWeatherByCoords = (coords) => {
	const params = {
		...coords,
		units: 'metric',
	};
	return request.get('weather', { params })
				  .then((response) => utils.convertDataToWeatherModel(response.data))
				  .catch((error) => error);
};

export default {
	getWeatherByCity,
	getWeatherByCoords,
};
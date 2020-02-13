/**
 * Converts OpenWeatherMapData to WeatherModel.
 * @param {!Object} data
 * @return {!WeatherModel}
 */
const convertDataToWeatherModel = (data) => ({
	id: data.id,
	name: data.name,
	temp: data.main.temp,
	wind: data.wind.speed,
	clouds: data.weather[0],
});

export default {
	convertDataToWeatherModel,
};
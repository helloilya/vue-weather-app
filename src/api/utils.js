/**
 * Converts OpenWeatherMapData response to WeatherModel.
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

/**
 * Filters and converts GeoDB response to CityModel.
 * @param {!Object} cities
 * @return {!CityModel[]}
 */
const filterGeoDataToCityModel = (cities) => {
	return cities.reduce((acc, item) => {
		if (item.type === 'CITY') {
			acc.push({
				id: item.id,
				name: item.city,
				country: item.country,
			});
		}
		return acc;
	}, []);
};

export default {
	convertDataToWeatherModel,
	filterGeoDataToCityModel,
};
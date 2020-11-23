import request from './request';
import utils from '@/api/utils';

/**
 * Gets list of cities.
 * @param {string} query
 * @return {!Promise<!CityModel[]>}
 */
const getCities = (query) => {
	const params = {
		namePrefix: query,
		limit: 5,
	};
	return request.get('cities', { params })
				  .then((response) => utils.filterGeoDataToCityModel(response.data.data))
				  .catch((error) => error);
};

export default {
	getCities,
};
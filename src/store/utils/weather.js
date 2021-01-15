import { ROUTE_STATES } from '@/constants';

/**
 * Gets location query param value.
 * @return {string}
 */
const getLocationParamValue = () => $router.history.current.query.location;

/**
 * Updates location query param value.
 * @param {string} location
 */
const updateLocationParamValue = (location) => {
	const value = location.toLowerCase();
	if ($router.history.current.name !== ROUTE_STATES.HOME || value === getLocationParamValue()) {
		return;
	}

	$router.push({
		query: {
			location: value,
		},
	});
};

export default {
	getLocationParamValue,
	updateLocationParamValue,
};
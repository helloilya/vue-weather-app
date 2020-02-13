/**
 * Gets lat and lon coords based on geo.
 * @return {!Promise<!Object>}
 */
const getLocationCoords = () => {
	const geo = navigator.geolocation;
	return new Promise((resolve, reject) => {
		if (geo) {
			geo.getCurrentPosition((position) => {
				resolve({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			});
		} else {
			reject({});
		}
	});
};

export default {
	getLocationCoords,
};
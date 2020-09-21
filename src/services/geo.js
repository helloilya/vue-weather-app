/**
 * Gets lat and lon coords based on location.
 * @return {!Promise<?CoordsModel>}
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
			}, () => {
				resolve(null);
			});
		} else {
			resolve({});
		}
	});
};

export default {
	getLocationCoords,
};
/**
 * Gets lat and lon coords based on geo.
 * @return {!Promise<!CoodsModel>}
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
				resolve({});
			});
		} else {
			resolve({});
		}
	});
};

export default {
	getLocationCoords,
};
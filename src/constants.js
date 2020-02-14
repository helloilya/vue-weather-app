/**
 * The openWeatherMap API key.
 * @const {string}
 */
const API_KEY = '';

/**
 * The root path for api call.
 * @const {string}
 */
const API_PATH = '//api.openweathermap.org/data/2.5/';

/**
 * The list of names for routing.
 * @enum {string}
 */
const ROUTE_STATES = {
	HOME: 'home',
	ABOUT: 'about',
	ERROR: 'error',
};

export {
	API_KEY,
	API_PATH,
	ROUTE_STATES,
};
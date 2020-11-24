/**
 * The default city for first init.
 * @const {string}
 */
const DEFAULT_CITY = 'Saint Petersburg';

/**
 * The list of names for routing.
 * @enum {string}
 */
const ROUTE_STATES = {
	HOME: 'home',
	ABOUT: 'about',
	ERROR: 'error',
};

/**
 * The list of temperature measurement.
 * @const {!UnitModel[]}
 */
const TEMPERATURE_UNITS = [
	{
		id: 1,
		key: 'metric',
		name: 'Celsius',
		symbol: '°C',
	},
	{
		id: 2,
		key: 'imperial',
		name: 'Fahrenheit',
		symbol: '°F',
	},
];

export {
	DEFAULT_CITY,
	ROUTE_STATES,
	TEMPERATURE_UNITS,
};
/**
 * Rounds off the number value.
 * @param {number} value
 * @return {number}
 */
const roundFilter = (value) => Math.round(value);

/**
 * Coverts temperature value to weather measurement.
 * @param {number} value
 * @param {!UnitModel} unit
 * @return {string}
 */
const temperatureFilter = (value, unit) => {
	const data = unit.key === 'imperial' ? Math.round(value * 1.8 + 32) : value;
	return `${data} ${unit.symbol}`;
};

export {
	roundFilter,
	temperatureFilter,
};
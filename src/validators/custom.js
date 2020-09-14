import { DEFAULT_CITY } from '@/constants';

/**
 * Validates city's name.
 * @return {!Object}
 */
const cityValidator = {
	validate: (value) => value.toLowerCase() !== DEFAULT_CITY.toLowerCase(),
	message: 'Please type no default city',
};

export {
	cityValidator,
};
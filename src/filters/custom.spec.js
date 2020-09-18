import { expect } from 'chai';
import { roundFilter, temperatureFilter } from './custom';
import { TEMPERATURE_UNITS } from '@/constants';

const fakeValue = 1.7;

describe('roundFilter', () => {
	it('should return rounded off value', () => {
		const result = Math.round(fakeValue);

		expect(roundFilter(fakeValue)).to.equal(result);
	});
});

describe('temperatureFilter', () => {
	it('should return value converted to imperial unit', () => {
		const unit = TEMPERATURE_UNITS.find((item) => item.key === 'imperial');
		const result = `${Math.round(fakeValue * 1.8 + 32)} ${unit.symbol}`;

		expect(temperatureFilter(fakeValue, unit)).to.equal(result);
	});
});
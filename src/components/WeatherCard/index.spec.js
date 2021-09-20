import WeatherCard from './index';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import { TEMPERATURE_UNITS } from '@/constants';

/** {!UnitModel} */
const fakeUnit = TEMPERATURE_UNITS[0];

/** {!WeatherModel} */
const fakeWeather = {
	temp: 1,
	wind: 4,
	clouds: {},
};

const comp = shallowMount(WeatherCard, {
	mocks: {},
	props: {
		weather: fakeWeather,
		unitObject: fakeUnit,
	},
});

describe(WeatherCard.name, () => {
	it('should render component with correct data', () => {
		const result = `${fakeWeather.temp} ${fakeUnit.symbol}, ${fakeWeather.wind} ☴`;

		expect(comp.text()).to.equal(result);
	});
});
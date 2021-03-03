import { createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import WeatherCard from './index';

/** {!UnitModel} */
const fakeUnit = {};

/** {!WeatherModel} */
const fakeWeather = {
	temp: 1,
	wind: 4,
	clouds: {},
};

const localVue = createLocalVue();
const filter = (value) => value;
localVue.filter('round', filter);
localVue.filter('temperature', filter);

const comp = shallowMount(WeatherCard, {
	localVue,
	mocks: {},
	propsData: {
		weather: fakeWeather,
		unitObject: fakeUnit,
	},
});

describe(WeatherCard.name, () => {
	it('should render component with correct data', () => {
		const result = `${fakeWeather.temp}, ${fakeWeather.wind} ☴`;

		expect(comp.text()).to.equal(result);
	});
});
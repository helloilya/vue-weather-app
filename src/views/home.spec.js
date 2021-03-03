import Vuex from 'vuex';
import sinon from 'sinon';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import Home from './Home';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

const fakeCity = 'city';

/** {!UnitModel} */
const fakeUnit = {
	id: 1,
	name: 'unit',
};

/** {!WeatherModel} */
const fakeWeather = {
	id: 1,
	name: fakeCity,
	clouds: {},
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe(Home.name, () => {
	let comp;
	let store;
	let getters;
	let actions;

	beforeEach(() => {
		getters = {
			[settingStore.getters.unit]: () => fakeUnit,
			[weatherStore.getters.weather]: () => fakeWeather,
		};
		actions = {
			[weatherStore.actions.update]: sinon.stub(),
		};
		store = new Vuex.Store({
			getters,
			actions,
		});

		comp = shallowMount(Home, {
			localVue,
			store,
		});
	});

	it('should set default city', () => {
		expect(comp.vm.location).to.equal(fakeCity);
	});
});
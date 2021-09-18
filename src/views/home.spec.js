import sinon from 'sinon';
import Home from './Home';
import { createStore } from 'vuex';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

const fakeLocation = 'location';

/** {!UnitModel} */
const fakeUnit = {
	id: 1,
	name: 'unit',
};

/** {!WeatherModel} */
const fakeWeather = {
	id: 1,
	name: fakeLocation,
	clouds: {},
};

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
		store = createStore({
			getters,
			actions,
		});

		comp = shallowMount(Home, {
			global: {
				provide: {
					store: store,
				},
			},
		});
	});

	it('should set default city', () => {
		expect(comp.vm.weather.name).to.equal(fakeLocation);
	});

	it('should dispatch update action', () => {
		comp.vm.updateWeather(fakeLocation);

		sinon.assert.calledWith(actions[weatherStore.actions.update]);
	});
});
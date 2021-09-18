import App from './App';
import flushPromises from 'flush-promises';
import router from '@/router';
import sinon from 'sinon';
import { createStore } from 'vuex';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

/** {!UnitModel} */
const fakeUnit = {
	id: 1,
	name: 'unit',
};

const fakeCity = 'city';

describe(App.name, () => {
	let comp;
	let store;
	let getters;
	let actions;

	beforeEach(() => {
		getters = {
			[settingStore.getters.unit]: () => fakeUnit,
			[weatherStore.getters.isLoaded]: () => true,
			[settingStore.getters.lastSavedCityName]: () => fakeCity,
		};
		actions = {
			[settingStore.actions.updateUnit]: sinon.stub(),
			[weatherStore.actions.initWeather]: sinon.stub(),
		};
		store = createStore({
			getters,
			actions,
		});

		comp = shallowMount(App, {
			global: {
				plugins: [router],
				provide: {
					store: store,
				},
			},
		});
	});

	it('should set unitId', () => {
		expect(comp.vm.unit).to.equal(fakeUnit.id);
	});

	it('should call getDefaultWeather', () => {
		sinon.assert.called(actions[weatherStore.actions.initWeather]);
	});

	it('should call updateUnit', () => {
		comp.vm.changeUnit();

		sinon.assert.calledWith(actions[settingStore.actions.updateUnit]);
	});
});
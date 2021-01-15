import Vuex from 'vuex';
import VueRouter from 'vue-router';
import sinon from 'sinon';
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import { expect } from 'chai';
import App from './App';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

/** {!UnitModel} */
const fakeUnit = {
	id: 1,
	name: 'unit',
};

const fakeRoute = {
	path: '',
	name: 'name',
};

const fakeCity = 'city';

const localVue = createLocalVue();
const filter = (value) => value;
const router = new VueRouter({
	routes: [fakeRoute],
});

localVue.filter('round', filter);
localVue.use(Vuex);
localVue.use(VueRouter);

describe('app', () => {
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
		store = new Vuex.Store({
			getters,
			actions,
		});

		comp = shallowMount(App, {
			localVue,
			store,
			router,
		});
	});

	it('should set unitId', () => {
		expect(comp.vm.unit).to.equal(fakeUnit.id);
	});

	it('should set currentState', () => {
		expect(comp.vm.currentState).to.equal(fakeRoute.name);
	});

	it('should call getDefaultWeather', () => {
		sinon.assert.called(actions[weatherStore.actions.initWeather]);
	});

	it('should call updateUnit', () => {
		comp.vm.onChangeUnit();

		sinon.assert.calledWith(actions[settingStore.actions.updateUnit]);
	});
});
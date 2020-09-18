import Vuex from 'vuex';
import VueRouter from 'vue-router';
import sinon from 'sinon';
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import { expect } from 'chai';
import Home from './App';
import { constants as settingStore } from '@/store/modules/setting';
import { constants as weatherStore } from '@/store/modules/weather';

/** {!UnitModel} */
const fakeUnit = {
	id: 1,
	name: 'unit',
};

const localVue = createLocalVue();
const filter = (value) => value;
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
		};
		actions = {
			[settingStore.actions.updateUnit]: sinon.stub(),
			[weatherStore.actions.getDefault]: sinon.stub(),
		};
		store = new Vuex.Store({
			getters,
			actions,
		});

		comp = shallowMount(Home, {
			localVue,
			store,
			stubs: {
				RouterLink: RouterLinkStub,
			},
		});
	});

	it('should set unitId', () => {
		expect(comp.vm.unit).to.equal(fakeUnit.id);
	});

	it('should call getDefaultWeather', () => {
		sinon.assert.called(actions[weatherStore.actions.getDefault]);
	});

	it('should call updateUnit', () => {
		comp.vm.onChangeUnit();

		sinon.assert.calledWith(actions[settingStore.actions.updateUnit]);
	});
});
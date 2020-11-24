import sinon from 'sinon';
import { expect } from 'chai';
import api from '@/api';
import geo from '@/services/geo';
import weather from './weather';
import { constants as settingStore } from '@/store/modules/setting';

const { getters, mutations, actions } = weather;
const fakeLocation = 'location';
const fakeWeather = {
	id: 1,
	name: fakeLocation,
};

describe('weatherStore', () => {
	let state;
	let getLocationCoordsStab;
	let getWeatherByCoordsStab;
	let getWeatherByCityStab;

	beforeEach(() => {
		state = {
			isLoaded: false,
			weather: {},
		};
		getLocationCoordsStab = sinon.stub(geo, 'getLocationCoords').resolves({});
		getWeatherByCoordsStab = sinon.stub(api.weather, 'getWeatherByCoords').resolves(fakeWeather);
		getWeatherByCityStab = sinon.stub(api.weather, 'getWeatherByCity').resolves(fakeWeather);
	});

	afterEach(() => {
		getLocationCoordsStab.restore();
		getWeatherByCoordsStab.restore();
		getWeatherByCityStab.restore();
	});

	describe('mutations', () => {
		it('should return isLoaded flag as true', () => {
			mutations.setStateAsLoaded(state);

			expect(getters.getIsLoaded(state)).to.be.true;
		});

		it('should return valid weather data', () => {
			mutations.updateWeather(state, fakeWeather);

			expect(getters.getWeather(state)).to.deep.equal(fakeWeather);
		});
	});

	describe('actions', () => {
		let commit;
		let dispatch;

		beforeEach(() => {
			commit = sinon.spy();
			dispatch = sinon.spy();
		});

		it('should call updateWeather mutation', async () => {
			await actions.updateWeather({ dispatch, commit }, fakeLocation);

			sinon.assert.calledWith(commit, 'updateWeather', fakeWeather);
		});

		it('should dispatch action from settingStore', async () => {
			await actions.updateWeather({ dispatch, commit }, fakeLocation);

			sinon.assert.calledWith(dispatch, settingStore.actions.saveCity);
		});

		it('should call setStateAsLoaded mutation', async () => {
			await actions.getDefaultWeather({ commit });

			sinon.assert.calledWith(commit, 'setStateAsLoaded');
		});
	});
});
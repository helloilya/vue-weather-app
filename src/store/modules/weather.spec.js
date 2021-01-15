import sinon from 'sinon';
import { expect } from 'chai';
import api from '@/api';
import geo from '@/services/geo';
import weather from './weather';
import utils from '@/store/utils/weather';
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
	let getLocationParamValueStub;
	let updateLocationParamValueStub;

	beforeEach(() => {
		state = {
			isLoaded: false,
			weather: {},
		};

		getLocationCoordsStab = sinon.stub(geo, 'getLocationCoords').resolves({});
		getWeatherByCoordsStab = sinon.stub(api.weather, 'getWeatherByCoords').resolves(fakeWeather);
		getWeatherByCityStab = sinon.stub(api.weather, 'getWeatherByCity').resolves(fakeWeather);

		getLocationParamValueStub = sinon.stub(utils, 'getLocationParamValue').resolves(fakeLocation);
		updateLocationParamValueStub = sinon.stub(utils, 'updateLocationParamValue');
	});

	afterEach(() => {
		getLocationCoordsStab.restore();
		getWeatherByCoordsStab.restore();
		getWeatherByCityStab.restore();

		getLocationParamValueStub.restore();
		updateLocationParamValueStub.restore();
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

		describe('updateWeather', () => {
			beforeEach(async () => {
				await actions.updateWeather({ dispatch, commit }, fakeLocation);
			});

			it('should call updateWeather mutation', () => {
				sinon.assert.calledWith(commit, 'updateWeather', fakeWeather);
			});

			it('should dispatch saveCity', () => {
				sinon.assert.calledWith(dispatch, settingStore.actions.saveCity, fakeWeather);
			});

			it('should call updateLocationParamValue method', () => {
				sinon.assert.calledWith(utils.updateLocationParamValue, fakeLocation);
			});
		});
	});
});
import sinon from 'sinon';
import api from '@/api';
import geo from '@/services/geo';
import router from '@/router';
import weather from './weather';
import { expect } from 'chai';
import { constants as settingStore } from '@/store/modules/setting';

const { getters, mutations, actions } = weather;
const fakeLocation = 'location';
const fakeWeather = {
	id: 1,
	name: fakeLocation,
};

describe('weatherStore', () => {
	let state;
	let routerStab;
	let getLocationCoordsStab;
	let getWeatherByCoordsStab;
	let getWeatherByCityStab;

	beforeEach(() => {
		state = {
			isLoaded: false,
			weather: {},
		};

		routerStab = sinon.stub(router, 'push');
		getLocationCoordsStab = sinon.stub(geo, 'getLocationCoords').resolves({});
		getWeatherByCoordsStab = sinon.stub(api.weather, 'getWeatherByCoords').resolves(fakeWeather);
		getWeatherByCityStab = sinon.stub(api.weather, 'getWeatherByCity').resolves(fakeWeather);
	});

	afterEach(() => {
		routerStab.restore();
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

			it('should call update query method', () => {
				sinon.assert.calledWith(router.push, {
					query: {
						location: fakeLocation,
					},
				});
			});
		});
	});
});
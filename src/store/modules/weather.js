import api from '@/api';
import geo from '@/services/geo';
import utils from '@/store/utils/weather';
import { constants as settingStore } from '@/store/modules/setting';
import { DEFAULT_CITY } from '@/constants';

const state = {
	isLoaded: false,
	weather: {}, // {!WeatherModel}
};

const getters = {
	getIsLoaded: (state) => state.isLoaded,
	getWeather: (state) => state.weather,
};

const mutations = {
	setStateAsLoaded(state) {
		state.isLoaded = true;
	},

	/** @param {!WeatherModel} payload */
	updateWeather(state, payload) {
		state.weather = payload;
	},
};

const actions = {
	/**
	 * Gets weather by city name and updates data/query.
	 * @param {string} location
	 */
	async updateWeather({ dispatch, commit }, location) {
		const weather = await api.weather.getWeatherByCity(location);
		if (!weather.id) {
			return;
		}

		dispatch(settingStore.actions.saveCity, weather, { root: true });
		utils.updateLocationParamValue(weather.name);
		commit('updateWeather', weather);
	},

	/**
	 * Inits default weather based on query params and user geo coords.
	 */
	async initWeather({ dispatch, commit }) {
		const query = utils.getLocationParamValue();
		const coords = await geo.getLocationCoords();

		let location;
		if (query && query.length > 2) {
			const cities = await api.geo.getCities(query);
			location = cities.length ? cities[0].name : undefined;
		}

		let weather;
		if (location) {
			weather = await api.weather.getWeatherByCity(location);
		} else {
			weather = coords ? await api.weather.getWeatherByCoords(coords) : await api.weather.getWeatherByCity(DEFAULT_CITY);
		}

		dispatch(settingStore.actions.saveCity, weather, { root: true });
		utils.updateLocationParamValue(weather.name);
		commit('updateWeather', weather);
		commit('setStateAsLoaded');
	},
};

export const constants = {
	getters: {
		isLoaded: 'weather/getIsLoaded',
		weather: 'weather/getWeather',
	},
	actions: {
		getDefault: 'weather/initWeather',
		update: 'weather/updateWeather',
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
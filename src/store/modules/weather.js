import api from '@/api';
import geo from '@/services/geo';
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
	updateWeather(state, payload) {
		state.weather = payload;
	},
};

const actions = {
	async updateWeather({ dispatch, commit }, location) {
		const weather = await api.weather.getWeatherByCity(location);
		if (!weather.id) {
			return;
		}

		dispatch(settingStore.actions.saveCity, weather, { root: true });
		commit('updateWeather', weather);
	},
	async getDefaultWeather({ commit }) {
		const coords = await geo.getLocationCoords();
		const weather = coords ? await api.weather.getWeatherByCoords(coords) : await api.weather.getWeatherByCity(DEFAULT_CITY);
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
		getDefault: 'weather/getDefaultWeather',
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
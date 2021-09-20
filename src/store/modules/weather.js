import api from '@/api';
import geo from '@/services/geo';
import router from '@/router';
import { constants as settingStore } from '@/store/modules/setting';
import { DEFAULT_CITY, QUERY_PARAMS, ROUTE_STATES } from '@/constants';

function updateLocationQueryParam(value) {
	router.push({
		query: {
			[QUERY_PARAMS.LOCATION]: value.toLowerCase(),
		},
	});
}

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
	 * Gets weather by city name.
	 * @param {string} location
	 */
	async updateWeather({ dispatch, commit }, location) {
		const weather = await api.weather.getWeatherByCity(location);
		if (!weather.id) {
			return;
		}

		dispatch(settingStore.actions.saveCity, weather, { root: true });
		updateLocationQueryParam(location);
		commit('updateWeather', weather);
	},

	/**
	 * Inits default weather based on user geo coords.
	 */
	async initWeather({ dispatch, commit }) {
		const locationSearchParam = new URL(window.location.href).searchParams.get(QUERY_PARAMS.LOCATION);
		const coords = await geo.getLocationCoords();

		let weather = locationSearchParam ? await api.weather.getWeatherByCity(locationSearchParam)
										  : await api.weather.getWeatherByCoords(coords);
		if (!weather.id) {
			weather = await api.weather.getWeatherByCity(DEFAULT_CITY);
		}

		dispatch(settingStore.actions.saveCity, weather, { root: true });
		if (router.currentRoute.value.name === ROUTE_STATES.HOME) {
			updateLocationQueryParam(weather.name);
		}
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
		initWeather: 'weather/initWeather',
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
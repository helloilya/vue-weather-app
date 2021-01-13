import { TEMPERATURE_UNITS } from '@/constants';

const state = {
	unit: 1,
	history: [], // {!HistoryModel[]}
};

const getters = {
	getUnit: (state) => TEMPERATURE_UNITS.find((unit) => unit.id === state.unit),
	getHistory: (state) => state.history,
	getLastSavedCityName: (state) => state.history[state.history.length - 1].city,
};

const mutations = {
	/** @param {number} payload */
	updateUnit(state, payload) {
		state.unit = payload;
	},

	/** @param {!HistoryModel} payload */
	saveCity(state, payload) {
		state.history.push(payload);
	},
};

const actions = {
	/** @param {number} unit */
	updateUnit({ commit }, unit) {
		commit('updateUnit', unit);
	},

	/** @param {!WeatherModel} weather */
	saveCity({ commit }, weather) {
		commit('saveCity', {
			id: weather.id,
			city: weather.name,
			temp: weather.temp,
		});
	},
};

export const constants = {
	getters: {
		unit: 'setting/getUnit',
		history: 'setting/getHistory',
		lastSavedCityName: 'setting/getLastSavedCityName',
	},
	actions: {
		updateUnit: 'setting/updateUnit',
		saveCity: 'setting/saveCity',
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
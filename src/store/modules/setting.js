import { TEMPERATURE_UNITS } from '@/constants';

const state = {
	unit: 1,
	history: [], // {!HistoryModel[]}
};

const getters = {
	getUnit: (state) => TEMPERATURE_UNITS.find((unit) => unit.id === state.unit),
	getHistory: (state) => state.history,
};

const mutations = {
	updateUnit(state, payload) {
		state.unit = payload;
	},
	/** @type {!HistoryModel} */
	saveCity(state, payload) {
		state.history.push(payload);
	},
};

const actions = {
	updateUnit({ commit }, unit) {
		commit('updateUnit', unit);
	},
	/** @type {!WeatherModel} */
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
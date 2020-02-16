import { TEMPERATURE_UNITS } from '@/constants';

const state = {
	unit: 1,
	cities: [], // {!CityModel[]}
};

const getters = {
	getUnit: (state) => TEMPERATURE_UNITS.find((unit) => unit.id === state.unit),
	getCities: (state) => state.cities,
	getCityById: (state) => (id) => state.cities.find((city) => city.id === id),
};

const mutations = {
	updateUnit(state, payload) {
		state.unit = payload;
	},
	addCity(state, payload) {
		state.cities.push(payload);
	},
};

const actions = {
	updateUnit({ commit }, unit) {
		commit('updateUnit', unit);
	},
	addCity({ commit }, weather) {
		commit('addCity', {
			id: weather.id,
			name: weather.name,
			temp: weather.temp,
		});
	},
};

export const constants = {
	getters: {
		unit: 'setting/getUnit',
		cities: 'setting/getCities',
		cityById: 'setting/getCityById',
	},
	actions: {
		updateUnit: 'setting/updateUnit',
		addCity: 'setting/addCity',
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
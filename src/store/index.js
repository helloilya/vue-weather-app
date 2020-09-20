import Vue from 'vue';
import Vuex from 'vuex';
import setting from './modules/setting';
import weather from './modules/weather';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		setting,
		weather,
	},
	strict: process.env.NODE_ENV !== 'production',
});

export default store;